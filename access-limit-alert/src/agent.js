const fs = require("fs");
const path = require("path");
const { Finding, FindingSeverity, FindingType } = require("forta-agent");

// Get records from local accessRec.json file;
const getAccessRec = (account) => {
  try {
    let rec = JSON.parse(fs.readFileSync(path.resolve(__dirname, "./accessRec.json")))[account];
    return rec;
  } catch (error) {
    console.log(error);
  }
}

// Update records;
const writeAccessRec = (account, count, timestamp, ) => {
  let recs = JSON.parse(fs.readFileSync(path.resolve(__dirname, "./accessRec.json")));
  recs[account] = {
    count,
    timestamp
  };
  try {
    fs.writeFileSync(path.resolve(__dirname, "./accessRec.json"), JSON.stringify(recs));
  } catch (error) {
    console.log(error);
  }
}

// Listen specified function
const functionFilter = (txEvent) => {
  const walletImplementAddress = "0x8a0c20A2Abf7de9a441ADfA6B4EdbEEFB411c901";
  const transferFunctionAbi = "function transfer(address to)";
  const transfers = txEvent.filterFunction(transferFunctionAbi, walletImplementAddress);
  return transfers;
}

const createNewRec = (account, timestamp) => {
  return {
    [account]: {
      count: 0,
      timestamp: timestamp
    }
  }
}

const provideHandleTransaction = () => {

  return async (txEvent) => {
    const findings = [];

    const from = txEvent.transaction.from;
    const timestamp = txEvent.block.timestamp;
    let rec = getAccessRec(from) == undefined ? createNewRec(from, timestamp)[from] : getAccessRec(from);

    const transfers = functionFilter(txEvent);
    
    if (transfers.length > 0) {
      // push finding if count greater than 10 per one hour 
      if (rec.count > 10 && timestamp - rec.timestamp <= 3600000) {
        findings.push(
          Finding.fromObject({
            name: "Access limit",
            description: `Account ${from}, access ${rec.count} time`,
            alertId: "MassDao-access-limit",
            severity: FindingSeverity.High,
            type: FindingType.Suspicious,
          })
        )
      } else {
        const count = rec.count + 1;
        writeAccessRec(from, count, rec.timestamp);
      }
      return findings;
    }

  };
}


module.exports = {
  handleTransaction: provideHandleTransaction()
};
