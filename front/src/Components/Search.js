import React, { useState } from "react";
import styled from "styled-components";
import { Redirect } from "react-router-dom";
import { SearchBar, isEmpty } from "./components.js";
import { useSearchDoctorByName } from "./api.js";
import SSection from "./SearchSection.js";
import Detail from "./SearchPoster.js";

// Images
import WeKoLogo from "../images/Main/WeKoAppt.png";
// Bootstrap
import Container from "react-bootstrap/Container";
import ToggleButtonGroup from "react-bootstrap/ToggleButtonGroup";
import ToggleButton from "react-bootstrap/ToggleButton";
import ButtonToolbar from "react-bootstrap/ButtonToolbar";
import Spinner from "react-bootstrap/Spinner";

const SHeader = styled.div`
	margin-top: 5px;
	text-align: center;
	font-size: 20px;
	padding: 15px;
	border-bottom: solid 3px lightgray;
`;

const SNotMainLogo = styled.div`
	justify-content: center;
	padding-top: 5px;
	padding-bottom: 5px;
	padding-right: 35px;
	padding-left: 35px;
	display: flex;
`;

const SNotMainImage = styled.img`
  width: 100%
  height: 100%
`;

const SButtonToolbar = styled(ButtonToolbar)`
	justify-content: center;
	padding: 5px;
`;

export function Search(props) {
	const name = props.match.params.name; // name from url address.
	const push = props.history.push;

	const [value, setValue] = useState(1); // for radio buttons
	const [search, setSearch] = useState(name);
	const { loading, doctors, error } = useSearchDoctorByName(name);
	//TODO: make useSearchClinicByName(name); so that clinic radio button will show the right result

	//console.log(doctors);

	const handleRaio = val => {
		setValue(val);
	};
	//console.log(value);

	if (loading) {
		return (
			<>
				<Spinner animation="border" variant="primary" />
				<div>Loading...</div>
			</>
		);
	}
	if (!name) {
		return (
			<Container>
				<SHeader>Search Results</SHeader>

				<SNotMainLogo>
					<SNotMainImage src={WeKoLogo} alt="WeKoLogo" />
				</SNotMainLogo>
				<SearchBar onSubmit={setSearch} />
				<br />
				<div>Please Type doctor name!</div>
			</Container>
		);
	}
	if (search !== name) {
		return <Redirect to={`/search/${search}`} />;
	}
	if (isEmpty(doctors)) {
		return (
			<Container>
				<SHeader>Search Results</SHeader>

				<SNotMainLogo>
					<SNotMainImage src={WeKoLogo} alt="WeKoLogo" />
				</SNotMainLogo>
				<SearchBar onSubmit={setSearch} />
				<br />
				<div>{error}</div>
			</Container>
		);
	}
	if (error) {
		// Todo: handle no results error on Search page, not in main page
		return (
			<Container>
				<SHeader>Search Results</SHeader>

				<SNotMainLogo>
					<SNotMainImage src={WeKoLogo} alt="WeKoLogo" />
				</SNotMainLogo>
				<SearchBar onSubmit={setSearch} />
				<br />
				<p>Something went wrong: {error}</p>
			</Container>
		);
	}

	return (
		<>
			<Container>
				<SHeader>Search Results</SHeader>
				<SNotMainLogo>
					<SNotMainImage src={WeKoLogo} alt="WeKoLogo" />
				</SNotMainLogo>
				<SearchBar onSubmit={setSearch} />

				<SButtonToolbar>
					<ToggleButtonGroup
						type="radio"
						name="options"
						defaultValue={1}
						size="sm"
						value={value}
						onChange={handleRaio}
					>
						<ToggleButton variant="outline-primary" value={1}>
							Doctor
						</ToggleButton>
						<ToggleButton variant="outline-primary" value={2}>
							Clinic
						</ToggleButton>
					</ToggleButtonGroup>
				</SButtonToolbar>

				{value === 1 ? (
					<SSection title="Doctor Results">
						{doctors.map(doctor => (
							<Detail
								key={doctor._id}
								id={doctor._id}
								// title={doctor.title}
								firstName={doctor.firstName}
								lastName={doctor.lastName}
								address={doctor.address}
								push={push}
							/>
						))}
					</SSection>
				) : (
					<SSection title="Clinic Results">
						{/* TODO: make clinic search */}
						{doctors.map(doctor => (
							<Detail
								key={doctor._id}
								id={doctor._id}
								firstName={doctor.firstName}
								lastName={doctor.lastName}
								address={doctor.address}
							/>
						))}
					</SSection>
				)}
			</Container>
		</>
	);
}

export default Search;
