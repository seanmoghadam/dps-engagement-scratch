import "./style.css";
import { CrepoExample } from "./components/CrepoExample";
import { HelloComponent } from "./components/HelloComponent";

export function App() {
	return (
		<div className="custom-element-container">
			<HelloComponent />
			<CrepoExample />
		</div>
	);
}
