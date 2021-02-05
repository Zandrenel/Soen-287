
class activeTab {
	constructor(clicked) {
		var clicked;
		this.clicked = clicked;
		if (clicked) {
			return "active";
		}
		else
			return "faded";
	}
}
