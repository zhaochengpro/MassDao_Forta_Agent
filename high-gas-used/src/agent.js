const BigNumber = require("bignumber.js");
const { Finding, FindingSeverity, FindingType } = require("forta-agent");

const handleTransaction = async (txEvent) => {
  const findings = [];
  const walletImplementAddress = "0x8a0c20A2Abf7de9a441ADfA6B4EdbEEFB411c901";
  const transferFunctionAbi = "function transfer(address to)";
  const transfers = txEvent.filterFunction(transferFunctionAbi, walletImplementAddress);

  if (transfers > 0) {
    const gasUsed = new BigNumber(txEvent.gasUsed);
    if (gasUsed.isGreaterThan("1000000")) {
      findings.push(
        Finding.fromObject({
          name: "High Gas Used",
          description: `Gas Used: ${gasUsed}`,
          alertId: "MassDao-high-gas",
          severity: FindingSeverity.High,
          type: FindingType.Suspicious,
        })
      )
    }
  }

  return findings;
};


module.exports = {
  handleTransaction,
  // handleBlock,
};
