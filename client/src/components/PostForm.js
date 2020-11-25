import React from "react";
import { Form } from "semantic-ui-react";

import { useForm } from "../util/hooks";

export default function PostForm() {
	return (
		<Form onSubmit={onSubmit}>
			<h2>Create a post: </h2>
			<Form.Field>
				<Form.Input placeholder="Hi World!" name="body"></Form.Input>
			</Form.Field>
		</Form>
	);
}
