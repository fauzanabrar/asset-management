import { describe, it, expect, vi, beforeEach } from 'vitest'
import { UserService } from './user-service'
import { db } from '@/db'

// We rely on the mock from setup.ts, but we need to refine it here if needed
// or just use vi.mocked

describe('UserService', () => {
    beforeEach(() => {
        vi.clearAllMocks()
    })

    describe('findByIdentifier', () => {
        it('should find a user by username or email', async () => {
            const mockUser = { id: '1', username: 'testuser', email: 'test@example.com' }

            // Mocking the chain: db.select().from().where().limit()
            const mockLimit = vi.fn().mockResolvedValue([mockUser])
            const mockWhere = vi.fn().mockReturnValue({ limit: mockLimit })
            const mockFrom = vi.fn().mockReturnValue({ where: mockWhere })

            // @ts-ignore
            vi.mocked(db.select).mockReturnValue({ from: mockFrom })

            const user = await UserService.findByIdentifier('testuser')

            expect(db.select).toHaveBeenCalled()
            expect(user).toEqual(mockUser)
        })
    })

    describe('isIdentifierTaken', () => {
        it('should return true if username or email exists', async () => {
            const mockWhere = vi.fn().mockResolvedValue([{ username: 'taken_user', email: 'taken@example.com' }])
            const mockFrom = vi.fn().mockReturnValue({ where: mockWhere })

            // @ts-ignore
            vi.mocked(db.select).mockReturnValue({ from: mockFrom })

            const taken = await UserService.isIdentifierTaken('taken_user', 'taken@example.com')
            expect(taken).toEqual({ username: true, email: true })
        })

        it('should return false if username and email do not exist', async () => {
            const mockWhere = vi.fn().mockResolvedValue([])
            const mockFrom = vi.fn().mockReturnValue({ where: mockWhere })

            // @ts-ignore
            vi.mocked(db.select).mockReturnValue({ from: mockFrom })

            const taken = await UserService.isIdentifierTaken('free_user', 'free@example.com')
            expect(taken).toEqual({ username: false, email: false })
        })
    })
})
