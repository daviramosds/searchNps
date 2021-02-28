import request from 'supertest'
import { app } from '../app'
import createConnection from '../database'
import { getConnection } from 'typeorm'

describe('User', () => {
    beforeAll(async () => {
        const connection = await createConnection()
        await connection.runMigrations()
    })

    afterAll(async () => {
        const connection = getConnection()
        await connection.dropDatabase()
        await connection.close()
    })

    it('Should be able to create a new user', async () => {
        const response = await request(app).post('/users').send({
            name: 'User Exemple',
            email: 'user@exemple.com'
        })

        expect(response.status).toBe(201)
    })

    it("Should'nt be able to create a user with email already used", async () => {
        const response = await request(app).post('/users').send({
            name: 'User Exemple',
            email: 'user@exemple.com'
        })
        expect(response.status).toBe(400)
    })

})