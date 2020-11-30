import { Popup } from "semantic-ui-react";
import React from "react";

function MyPopup({ content, children }) {
	//trigger --> gives the children a popup ability
	//inverted --> changes popup theme (black)
	//content --> message that appears in popup
	return <Popup inverted content={content} trigger={children} />;
}

export default MyPopup;
