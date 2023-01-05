const {createFakeUser} = require('./dbhelper')

const {createUser, getUserByUsername, getUserById} = require('../../db/users')
const {dropTables, createTables} = require('../../db/initdb')
const client = require('../../db/index')


describe('Users DB', ()  =>{
    beforeAll(() =>  client.connect())
    beforeEach(async () => {await dropTables(), await createTables()})
    afterAll(async() => client.end())
describe('createUser()', () => {
    it('Creatues and returns a user' , async() => {
        const fakeUser = {
            id: 1,
            username: "bruh", 
            password: "yoyoyo123"
        }
        const createdUser = await createUser({
            username: "bruh", 
            password: "yoyoyo123"
            })
        expect(createdUser).toEqual(fakeUser)
        })  
    })
describe('get user by username', () => {
    it('Get user by username and return user', async () => {
        const fakeUserU = await createFakeUser({
            username: 'Jaron',
            password: '123123'
            })
        const userToGet = await getUserByUsername("Jaron")
        expect(userToGet).toEqual(fakeUserU)
        })
    })
describe('get user by id', () => {
    it('Get a user by there id and sucessfully return the user', async() => {
        const fakeUserU = await createFakeUser({
            username:'Jaron',
            password:'123123'
            })
            const userById = await getUserById(1)
            expect(userById).toEqual(fakeUserU)
        })
    })
})

