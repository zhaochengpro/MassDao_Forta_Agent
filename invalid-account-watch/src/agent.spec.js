const {
  FindingType,
  FindingSeverity,
  Finding,
  createTransactionEvent,
} = require("forta-agent");

const { handleTransaction } = require("./agent");

describe("blacklist", () => {
  const createTxEventWithBlacklist = () =>
    createTransactionEvent({
      transaction:{
        from: "0xa4aAb0154939a040951a20fa7Cd9c70eE41D2044"
      },
      addresses: {
        "0xa4aAb0154939a040951a20fa7Cd9c70eE41D2044": true,
        "0x8a0c20A2Abf7de9a441ADfA6B4EdbEEFB411c901": true
      }
    });

  it("return a finding if account is on the blacklist", async () => {
    const txEvent = createTxEventWithBlacklist();

    const findings = await handleTransaction(txEvent);
    const from = txEvent.transaction.from;
    expect(findings).toStrictEqual([
      Finding.fromObject({
        name: "alert invalid account",
        description: `block account: ${from}`,
        alertId: "MassDao_invalid_account_watch",
        severity: FindingSeverity.Medium,
        type: FindingType.Suspicious,
    })
    ])
  })
})