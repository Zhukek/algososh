import renderer from 'react-test-renderer';
import { render, fireEvent, screen } from '@testing-library/react';
import { ElementStates } from "../../../types/element-states";

import { Circle } from './circle';

describe('Тестирование Circle', () => {
    it('Circle без буквы',() => {
        const circle = renderer
            .create(<Circle />)
            .toJSON();
        expect(circle).toMatchSnapshot();
    })

    it('Circle с буквой',() => {
        const circle = renderer
            .create(<Circle letter='a' />)
            .toJSON();
        expect(circle).toMatchSnapshot();
    })

    it('Circle с head',() => {
        const circle = renderer
            .create(<Circle head={'head'}/>)
            .toJSON();
        expect(circle).toMatchSnapshot();
    })

    it('Circle с React head',() => {
        const circle = renderer
            .create(<Circle head={<Circle letter='head'/>}/>)
            .toJSON();
        expect(circle).toMatchSnapshot();
    })

    it('Circle с tail',() => {
        const circle = renderer
            .create(<Circle head={'tail'}/>)
            .toJSON();
        expect(circle).toMatchSnapshot();
    })

    it('Circle с React tail',() => {
        const circle = renderer
            .create(<Circle head={<Circle letter='tail'/>}/>)
            .toJSON();
        expect(circle).toMatchSnapshot();
    })

    it('Circle с index', () => {
        const circle = renderer
            .create(<Circle index={1}/>)
            .toJSON();
        expect(circle).toMatchSnapshot();
    })

    it('Circle small', () => {
        const circle = renderer
            .create(<Circle isSmall={true}/>)
            .toJSON();
        expect(circle).toMatchSnapshot();
    })

    it('Circle default', () => {
        const circle = renderer
            .create(<Circle state={ElementStates.Default}/>)
            .toJSON();
        expect(circle).toMatchSnapshot();
    })

    it('Circle changing', () => {
        const circle = renderer
            .create(<Circle state={ElementStates.Changing}/>)
            .toJSON();
        expect(circle).toMatchSnapshot();
    })

    it('Circle modified', () => {
        const circle = renderer
            .create(<Circle state={ElementStates.Modified}/>)
            .toJSON();
        expect(circle).toMatchSnapshot();
    })
})
