import { render, screen } from '@testing-library/react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from '../App';
import store from '../store';
import { createPopulation, updatePopulation } from '../utils/Population';
import { getArrayToUpdate, getArrayToCompare } from './mockData/Population';


it('Renders without crashing', () => {
	const div = document.createElement('div');
	ReactDOM.render(
		<Provider store={store}>
			<App />
		</Provider>,
		div
	);
});

it('Checks the correct nested size of the created array', () => {
	const size = 6;
	const createdArray = createPopulation(size);

	expect(Array.isArray(createdArray)).toBe(true);
	expect(createdArray.length).toBe(size);
	for(let i = 0; i < createdArray.length; i++) {
		expect(createdArray.length).toBe(size);
	}
});


it('Checks the correct updating of the given array', () => {
	const arrayToUpdate = getArrayToUpdate();
	const arrayToCompare = getArrayToCompare();
	const updatedArray = updatePopulation(arrayToUpdate);

	expect(updatedArray).toEqual(expect.arrayContaining(arrayToCompare));
});