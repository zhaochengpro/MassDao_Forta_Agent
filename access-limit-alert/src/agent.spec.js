const {
  FindingType,
  FindingSeverity,
  Finding,
  createTransactionEvent,
} = require("forta-agent");
const utils = require("web3-utils");
const { handleTransaction } = require("./agent");

describe('access limit', () => {
  it('', async () => {
    const txEvent = createTransactionEvent({
      transaction: {
        from: "0xa4aAb0154939a040951a20fa7Cd9c70eE41D2044",
        data: utils.encodePacked("function transfer(address to)", "0xa4aAb0154939a040951a20fa7Cd9c70eE41D2044")
      },
      block:{
        timestamp: new Date().getTime()
      }
    })

    await handleTransaction(txEvent);
    const txEvent1 = createTransactionEvent({
      transaction: {
        from: "0xa4aAb0154939a040951a20fa7Cd9c70eE41D2044",
        data: utils.encodePacked("function transfer(address to)", "0xa4aAb0154939a040951a20fa7Cd9c70eE41D2044")
      },
      block:{
        timestamp: new Date().getTime()
      }
    })

    await handleTransaction(txEvent1);
    const txEvent2 = createTransactionEvent({
      transaction: {
        from: "0xa4aAb0154939a040951a20fa7Cd9c70eE41D2044",
        data: utils.encodePacked("function transfer(address to)", "0xa4aAb0154939a040951a20fa7Cd9c70eE41D2044")
      },
      block:{
        timestamp: new Date().getTime()
      }
    })

    await handleTransaction(txEvent2);
    const txEvent3 = createTransactionEvent({
      transaction: {
        from: "0xa4aAb0154939a040951a20fa7Cd9c70eE41D2044",
        data: utils.encodePacked("function transfer(address to)", "0xa4aAb0154939a040951a20fa7Cd9c70eE41D2044")
      },
      block:{
        timestamp: new Date().getTime()
      }
    })

    await handleTransaction(txEvent3);
    const txEvent4 = createTransactionEvent({
      transaction: {
        from: "0xa4aAb0154939a040951a20fa7Cd9c70eE41D2044",
        data: utils.encodePacked("function transfer(address to)", "0xa4aAb0154939a040951a20fa7Cd9c70eE41D2044")
      },
      block:{
        timestamp: new Date().getTime()
      }
    })

    await handleTransaction(txEvent4);
    const txEvent5 = createTransactionEvent({
      transaction: {
        from: "0xa4aAb0154939a040951a20fa7Cd9c70eE41D2044",
        data: utils.encodePacked("function transfer(address to)", "0xa4aAb0154939a040951a20fa7Cd9c70eE41D2044")
      },
      block:{
        timestamp: new Date().getTime()
      }
    })

    await handleTransaction(txEvent5);
    const txEvent6 = createTransactionEvent({
      transaction: {
        from: "0xa4aAb0154939a040951a20fa7Cd9c70eE41D2044",
        data: utils.encodePacked("function transfer(address to)", "0xa4aAb0154939a040951a20fa7Cd9c70eE41D2044")
      },
      block:{
        timestamp: new Date().getTime()
      }
    })    
    await handleTransaction(txEvent6);
    const txEvent7 = createTransactionEvent({
      transaction: {
        from: "0xa4aAb0154939a040951a20fa7Cd9c70eE41D2044",
        data: utils.encodePacked("function transfer(address to)", "0xa4aAb0154939a040951a20fa7Cd9c70eE41D2044")
      },
      block:{
        timestamp: new Date().getTime()
      }
    })
    await handleTransaction(txEvent7);
    const txEvent8 = createTransactionEvent({
      transaction: {
        from: "0xa4aAb0154939a040951a20fa7Cd9c70eE41D2044",
        data: utils.encodePacked("function transfer(address to)", "0xa4aAb0154939a040951a20fa7Cd9c70eE41D2044")
      },
      block:{
        timestamp: new Date().getTime()
      }
    })
    await handleTransaction(txEvent8);
    const txEvent9 = createTransactionEvent({
      transaction: {
        from: "0xa4aAb0154939a040951a20fa7Cd9c70eE41D2044",
        data: utils.encodePacked("function transfer(address to)", "0xa4aAb0154939a040951a20fa7Cd9c70eE41D2044")
      },
      block:{
        timestamp: new Date().getTime()
      }
    })
    await handleTransaction(txEvent9);
    const txEvent10 = createTransactionEvent({
      transaction: {
        from: "0xa4aAb0154939a040951a20fa7Cd9c70eE41D2044",
        data: utils.encodePacked("function transfer(address to)", "0xa4aAb0154939a040951a20fa7Cd9c70eE41D2044")
      },
      block:{
        timestamp: new Date().getTime()
      }
    })
    const findings = await handleTransaction(txEvent10);
    expect(findings).toStrictEqual([
      Finding.fromObject({
        name: "Access limit",
        description: `Account 0xa4aAb0154939a040951a20fa7Cd9c70eE41D2044, access 11 time`,
        alertId: "MassDao-access-limit",
        severity: FindingSeverity.High,
        type: FindingType.Suspicious,
      })
    ]);
    
  });
  
});

