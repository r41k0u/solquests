import * as anchor from '@project-serum/anchor';
const assert = require('assert');
import { Program } from '@project-serum/anchor';
import { Calcdapp } from '../target/types/calcdapp';
const { SystemProgram } = anchor.web3;

describe('calcdapp', () => {

  // Configure the client to use the local cluster.
  const provider = anchor.Provider.local();
  anchor.setProvider(anchor.Provider.env());

  const program = anchor.workspace.Calcdapp;
  const calculator = anchor.web3.Keypair.generate();
  let _calculator;

  it('Creates a calculator', async () => {
    await program.rpc.create("Welcome to Solana", {
      accounts: {
        calculator: calculator.publicKey,
        user: provider.wallet.publicKey,
        systemProgram: SystemProgram.programId,
      },
      signers: [calculator]
    });

    const account = await program.account.calculator.fetch(calculator.publicKey);
    assert.ok(account.greeting === "Welcome to Solana");
    _calculator = calculator;
  });

  it("Adds two numbers", async function() {
    const calculator = _calculator;
    await program.rpc.add(new anchor.BN(1), new anchor.BN(2), {
      accounts: {
        calculator: calculator.publicKey,
      },
    });

    const account = await program.account.calculator.fetch(calculator.publicKey);
    assert.ok(account.result.eq(new anchor.BN(3)));
  });

  it('Multiplies two numbers', async function() {
    const calculator = _calculator;
    await program.rpc.multiply(new anchor.BN(1), new anchor.BN(2), {
      accounts: {
        calculator: calculator.publicKey,
      },
    });

    const account = await program.account.calculator.fetch(calculator.publicKey);
    assert.ok(account.result.eq(new anchor.BN(2)));
  })

  it('Subtracts two numbers', async function() {
    const calculator = _calculator;
    await program.rpc.subtract(new anchor.BN(1), new anchor.BN(2), {
      accounts: {
        calculator: calculator.publicKey,
      },
    });

    const account = await program.account.calculator.fetch(calculator.publicKey);
    assert.ok(account.result.eq(new anchor.BN(-1)));
  });

  it('Divides two numbers', async function() {
    const calculator = _calculator;
    await program.rpc.divide(new anchor.BN(1), new anchor.BN(2), {
      accounts: {
        calculator: calculator.publicKey,
      },
    });

    const account = await program.account.calculator.fetch(calculator.publicKey);
    assert.ok(account.remainder.eq(new anchor.BN(1)));
    assert.ok(account.result.eq(new anchor.BN(0)));
  });
});
