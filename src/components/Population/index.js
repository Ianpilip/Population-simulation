// @flow

import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updatePopulation } from '../../utils/Population';
import { updatePopulation as updatePopulationAction } from '../../actions/Population';
import { UPDATE_POPULATION_INTERVAL } from '../../constants/Population';
import './index.css';

const Population: React$ComponentType<{}> = () => {
	const commonPopulation: Array<Array<number>> = useSelector(store => store.population);
	const dispatch = useDispatch();

	useEffect(() => {
		const timer = setInterval(() => {
			dispatch(updatePopulationAction(updatePopulation(commonPopulation)));
		}, UPDATE_POPULATION_INTERVAL);

		return () => clearInterval(timer);
	}, [commonPopulation]);

	return (
		<div>
			<table>
				<tbody>
					{
						commonPopulation.map((commonPopulationItem, commonPopulationIndex) => (
							<tr key={commonPopulationIndex}>
								{
									commonPopulationItem.map((populationItem, populationIndex) => (
										<td key={populationIndex} className={populationItem === 1 ? 'black' : ''}></td>
									))
								}
							</tr>
						))
					}
				</tbody>
			</table>
		</div>
	);
}

export default Population;