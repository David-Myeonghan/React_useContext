import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const SContainer = styled.div`
	:not(:last-child) {
		margin-botton: 10px;
	}
	padding: 5px;
`;

const STitle = styled.span`
	font-size: 20px;
	font-weight: 600;
`;

const SDiv = styled.div``;

export default function SSection({ title, children }) {
	return (
		<SContainer>
			<STitle>{title}</STitle>
			<SDiv>{children}</SDiv>
		</SContainer>
	);
}
