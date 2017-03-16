import { Panel } from 'lucid';
import React from 'react';
import './WrestlerSummary.css';

const {
	number,
	string,
} = React.PropTypes;

const WrestlerSummary = ({
	name = '',
	health = 0,
	str = 0,
	bra = 0,
	dex = 0,
	tec = 0,
}) => (
	<div className='WrestlerSummary'>
		<Panel>
			<Panel.Header>
				<span>{name}</span>
			</Panel.Header>
			<div className='WrestlerSummary-stats'>
				<section>
					<header>STR</header>
					<span>{str}</span>
				</section>
				<section>
					<header>BRA</header>
					<span>{bra}</span>
				</section>
				<section>
					<header>DEX</header>
					<span>{dex}</span>
				</section>
				<section>
					<header>TEC</header>
					<span>{tec}</span>
				</section>
			</div>
			<Panel.Footer>
				<span>Health:</span>
				<span>{health}</span>
			</Panel.Footer>
		</Panel>
	</div>
);

WrestlerSummary.propTypes = {
	name: string,
	health: number,
	str: number,
	bra: number,
	dex: number,
	tec: number,
};

export default WrestlerSummary;
