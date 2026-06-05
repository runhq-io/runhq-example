// Sample code for the reviewer agent to inspect — intentionally flawed.
// The `reviewer` agent should flag: (1) loose equality `==`, (2) plaintext
// password comparison (no hashing/constant-time compare).
export function checkPassword(input, stored) {
  return input == stored;
}
