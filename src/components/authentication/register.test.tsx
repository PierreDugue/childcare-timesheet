import { fireEvent, render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { createUser } from '../../slices/user-slice';
import { Register } from './register';

const mockDispatch = vi.fn();

vi.mock('react-router', async () => {
    const originalModule = await vi.importActual('react-router');
    return {
        ...originalModule,
        Link: vi.fn(),
        useParams: vi.fn(),
    }
});

vi.mock("react-redux", async () => {
    const originalModule = await vi.importActual('react-redux');
    return {
        ...originalModule,
        useDispatch: () => mockDispatch
    }
});

describe('Register component', () => {

    beforeEach(() => {
        vi.clearAllMocks();
        mockDispatch.mockClear();
    });

    it('shows an error if fields are empty', () => {
        render(
            <Register />
        );

        const submitButton = screen.getByText(/Register/i);
        fireEvent.click(submitButton);

        expect(screen.getByText(/All fields are required/i)).toBeInTheDocument();
        expect(mockDispatch).not.toHaveBeenCalled();
    });

    it('dispatches createUser with correct data', () => {
        render(
            <Register />
        );

        fireEvent.change(screen.getByTestId('username'), {
            target: { value: 'testuser' },
        });
        fireEvent.change(screen.getByPlaceholderText(/Email/i), {
            target: { value: 'test@example.com' },
        });
        fireEvent.change(screen.getByPlaceholderText(/Password/i), {
            target: { value: 'password123' },
        });

        fireEvent.click(screen.getByText(/Register/i));

        expect(mockDispatch).toHaveBeenCalledTimes(1);
        expect(mockDispatch).toHaveBeenCalledWith(
            createUser({ username: 'testuser', email: 'test@example.com', password: 'password123' })
        );
    });
});
