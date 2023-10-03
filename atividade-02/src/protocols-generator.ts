import { v4 as uuidv4 } from 'uuid';

export function generateProtocolForPacient(name: string, lastName: string, priority: boolean) {
  return {
    priority,
    date: new Date(),
    pacient: `${name} ${lastName}`,
    protocol: uuidv4(),
  }
}