import { describe } from "node:test";
import { v4 } from "uuid";

jest.mock('uuid', ()=>{
    v4: jest.fn()
})

describe("This mocks the uuid", ()=>{

    it("generates a unique ID", ()=>{
        const mockedv4 = jest.requireMock('uuid').v4
        
        mockedv4.mockImplementation(()=> 'ytfhrdchgngxfghbn-oygfcgdcvnbxcu-j0gc')

        console.log(v4);
    })
    const id = v4()

    console.log(id);
})