import { CosmosButton } from "@cosmos/web-react";
import { useEffect, useRef, useState } from "react";
import { useRbAccount } from "../context/rb-account";

/**
 * "Stack — a Red Bull drop" : tetromino demo built by Engagement Builder.
 * Canvas renderer, no game deps. Keys: ← → move, ↑ rotate, ↓ soft drop,
 * space hard drop, R restart. Buttons mirror the keys for pointer users.
 */
const COLS = 10;
const ROWS = 18;
const CELL = 22;
const SHAPES: Record<string, number[][][]> = {
  I: [[[0,0,0,0],[1,1,1,1],[0,0,0,0],[0,0,0,0]]],
  O: [[[1,1],[1,1]]],
  T: [[[0,1,0],[1,1,1],[0,0,0]]],
  S: [[[0,1,1],[1,1,0],[0,0,0]]],
  Z: [[[1,1,0],[0,1,1],[0,0,0]]],
  J: [[[1,0,0],[1,1,1],[0,0,0]]],
  L: [[[0,0,1],[1,1,1],[0,0,0]]],
};
const COLORS: Record<string, string> = {
  I: "#00b0f0", O: "#ffd400", T: "#8b2fc9", S: "#00b140",
  Z: "#e11932", J: "#0055b8", L: "#ff6a00",
};

type Piece = { kind: string; rot: number; x: number; y: number };

function rotations(kind: string): number[][][] {
  const base = SHAPES[kind][0];
  const out: number[][][] = [];
  let m = base;
  for (let r = 0; r < 4; r++) {
    out.push(m);
    m = m.map((row, i) => row.map((_, j) => m[row.length - 1 - j][i]));
  }
  return out;
}
function cells(p: Piece): number[][] {
  const shape = rotations(p.kind)[p.rot % 4];
  const list: number[][] = [];
  shape.forEach((row, dy) => row.forEach((v, dx) => { if (v) list.push([p.x + dx, p.y + dy]); }));
  return list;
}

export function HelloComponent() {
  const { getUserProfile, loginWithRedirect } = useRbAccount();
  const [user, setUser] = useState<Awaited<ReturnType<typeof getUserProfile>> | null>(null);
  const [score, setScore] = useState(0);
  const [over, setOver] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const board = useRef<number[][]>(Array.from({ length: ROWS }, () => Array<number>(COLS).fill(0)));
  const piece = useRef<Piece>(newPiece());
  const tickRef = useRef<() => void>(() => {});

  function newPiece(): Piece {
    const kinds = Object.keys(SHAPES);
    return { kind: kinds[Math.floor(Math.random() * kinds.length)], rot: 0, x: 3, y: -1 };
  }
  function collides(p: Piece): boolean {
    return cells(p).some(([x, y]) => x < 0 || x >= COLS || y >= ROWS || (y >= 0 && board.current[y][x] !== 0));
  }
  function lockAndNext() {
    for (const [x, y] of cells(piece.current)) {
      if (y < 0) { setOver(true); return; }
      board.current[y][x] = Object.keys(SHAPES).indexOf(piece.current.kind) + 1;
    }
    let cleared = 0;
    board.current = board.current
      .filter(row => (cleared += row.every(v => v !== 0) ? 1 : 0, row.some(v => v === 0)))
      .concat(Array.from({ length: cleared }, () => Array<number>(COLS).fill(0)));
    if (cleared) setScore(s => s + [0, 100, 300, 500, 800][cleared]);
    piece.current = newPiece();
    if (collides(piece.current)) setOver(true);
  }
  function tick() {
    const moved = { ...piece.current, y: piece.current.y + 1 };
    if (!collides(moved)) piece.current = moved;
    else lockAndNext();
  }
  function act(action: string) {
    if (over && action !== "restart") return;
    if (action === "restart") {
      board.current = Array.from({ length: ROWS }, () => Array<number>(COLS).fill(0));
      piece.current = newPiece(); setScore(0); setOver(false); return;
    }
    const p = { ...piece.current };
    if (action === "left") p.x -= 1;
    if (action === "right") p.x += 1;
    if (action === "rotate") p.rot += 1;
    if (action === "down") { tickRef.current(); return; }
    if (action === "drop") { while (!collides({ ...p, y: p.y + 1 })) p.y += 1; }
    if (!collides(p)) piece.current = p;
    if (action === "drop") lockAndNext();
  }
  tickRef.current = tick;

  useEffect(() => {
    getUserProfile().then(setUser);
    const keys: Record<string, string> = {
      ArrowLeft: "left", ArrowRight: "right", ArrowUp: "rotate", ArrowDown: "down", " ": "drop", r: "restart", R: "restart",
    };
    const onKey = (e: KeyboardEvent) => {
      const a = keys[e.key];
      if (a) { e.preventDefault(); act(a); }
    };
    window.addEventListener("keydown", onKey);
    const iv = window.setInterval(() => tickRef.current(), 500);
    return () => { window.removeEventListener("keydown", onKey); window.clearInterval(iv); };
  }, [getUserProfile, over]);

  useEffect(() => {
    const cv = canvasRef.current;
    if (!cv) return;
    const ctx = cv.getContext("2d");
    if (!ctx) return;
    let raf = 0;
    const draw = () => {
      ctx.fillStyle = "#0b0d10";
      ctx.fillRect(0, 0, cv.width, cv.height);
      ctx.strokeStyle = "rgba(255,255,255,0.06)";
      for (let x = 0; x <= COLS; x++) { ctx.beginPath(); ctx.moveTo(x * CELL, 0); ctx.lineTo(x * CELL, ROWS * CELL); ctx.stroke(); }
      board.current.forEach((row, y) => row.forEach((v, x) => {
        if (!v) return;
        ctx.fillStyle = Object.values(COLORS)[v - 1] ?? "#fff";
        ctx.fillRect(x * CELL + 1, y * CELL + 1, CELL - 2, CELL - 2);
      }));
      const kind = Object.keys(SHAPES).indexOf(piece.current.kind) + 1;
      ctx.fillStyle = Object.values(COLORS)[kind - 1] ?? "#fff";
      for (const [x, y] of cells(piece.current)) if (y >= 0) ctx.fillRect(x * CELL + 1, y * CELL + 1, CELL - 2, CELL - 2);
      if (over) {
        ctx.fillStyle = "rgba(11,13,16,0.82)";
        ctx.fillRect(0, 0, cv.width, cv.height);
        ctx.fillStyle = "#fff";
        ctx.font = "bold 22px sans-serif";
        ctx.fillText("STACK'D", cv.width / 2 - 48, cv.height / 2 - 6);
        ctx.font = "12px sans-serif";
        ctx.fillText("press R or Restart", cv.width / 2 - 52, cv.height / 2 + 16);
      }
      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(raf);
  }, [over]);

  return (
    <div className="hello-component" style={{ textAlign: "center" }}>
      <h1>Stack — a Red Bull drop</h1>
      <p style={{ opacity: 0.75, fontSize: 14 }}>
        Engagement Builder artifact promotion demo — this bundle is served from platform storage, not a dev server.
      </p>
      <canvas
        ref={canvasRef}
        width={COLS * CELL}
        height={ROWS * CELL}
        style={{ border: "2px solid #e11932", borderRadius: 8, background: "#0b0d10", imageRendering: "pixelated" }}
        tabIndex={0}
        aria-label="Tetris-style stacking game. Arrow keys move and rotate, space drops, R restarts."
      />
      <div style={{ display: "flex", gap: "0.75rem", justifyContent: "center", alignItems: "center", margin: "0.75rem 0" }}>
        <CosmosButton kind="secondary" size="small" onClick={() => act("left")}>◀</CosmosButton>
        <CosmosButton kind="secondary" size="small" onClick={() => act("rotate")}>⟳</CosmosButton>
        <CosmosButton kind="secondary" size="small" onClick={() => act("right")}>▶</CosmosButton>
        <CosmosButton kind="secondary" size="small" onClick={() => act("drop")}>Drop</CosmosButton>
        <CosmosButton kind="primary" size="small" onClick={() => act("restart")}>Restart</CosmosButton>
        <strong style={{ fontVariantNumeric: "tabular-nums", minWidth: "6ch" }}>Score {score}</strong>
      </div>
      {user ? (
        <div>{user.firstName} — ready to stack</div>
      ) : (
        <CosmosButton kind="secondary" size="small" onClick={() => loginWithRedirect()}>Login</CosmosButton>
      )}
    </div>
  );
}
