import renderer from 'react-test-renderer';
import { render, screen, fireEvent } from '@testing-library/react';

import {Button} from './button';

describe('Тестирование кнопки', () => {
    it('Кнопка с текстом рендерится без ошибок', () => {
        const ButtonText = renderer
            .create(<Button text="Кнопка с текстом"/>)
            .toJSON();
        expect(ButtonText).toMatchSnapshot();
    }); 

    it('Кнопка без текста рендерится без ошибок', () => {
        const ButtonWithouText = renderer
            .create(<Button/>)
            .toJSON();
        expect(ButtonWithouText).toMatchSnapshot();
    }); 

    it('Заблокированная кнопка рендерится без ошибок', () => {
        const ButtonBlocked = renderer
            .create(<Button disabled/>)
            .toJSON();
        expect(ButtonBlocked).toMatchSnapshot();
    }); 

    it('Кнопка с загрузкой рендерится без ошибок', () => {
        const ButtonLoading = renderer
            .create(<Button isLoader={true}/>)
            .toJSON();
        expect(ButtonLoading).toMatchSnapshot();
    }); 

    it('OnClick работает корректно', () => {
        const someFunc = jest.fn();
        render(<Button text="TestingButton" onClick={someFunc}/>)

        const button = screen.getByText('TestingButton');
        fireEvent.click(button);
        expect(someFunc).toHaveBeenCalled()
    })
})
