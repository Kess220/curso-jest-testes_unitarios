import { generateProtocolForPacient } from "../../src/protocols-generator";

// Configure o mock do módulo uuid
jest.mock("uuid", () => ({ v4: () => "protocol gerado pelo mock" }));

describe("generateProtocolForPacient", () => {
  it("should generate a protocol with mock UUID", () => {
    // Dados fictícios do paciente
    const name = "John";
    const lastName = "Doe";
    const priority = true;

    // Chama a função generateProtocolForPacient
    const result = generateProtocolForPacient(name, lastName, priority);

    // Verifica se a função generateProtocolForPacient chamou o mock do uuidv4

    // Verifica se o resultado possui os valores esperados
    expect(result).toEqual({
      priority,
      date: expect.any(Date),
      pacient: `${name} ${lastName}`,
      protocol: expect.any(String), // Deve coincidir com o valor do mock
    });
  });
});
