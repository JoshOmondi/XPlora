import { describe } from "node:test";
import { v4 } from "uuid";

// jest.mock('uuid', ()=>{
//     v4: jest.in()
// })

describe("This mocks the uuid", ()=>{
    const id = v4()

    console.log(id);
})