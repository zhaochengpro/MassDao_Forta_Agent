const fs = require("fs");
const path = require("path");
const { Finding, FindingSeverity, FindingType } = require("forta-agent");

let blacklist = JSON.parse(fs.readFileSync(path.resolve(__dirname, "./blacklist.json")));


const provideHandleTransaction = () => {

    return async (txEvent) => {
        const findings = [];

        const addresses = txEvent.addresses;
        const walletImplementAddr = "0x8a0c20A2Abf7de9a441ADfA6B4EdbEEFB411c901";
        const from = txEvent.transaction.from;

        if (Object.keys(addresses).includes(walletImplementAddr) && blacklist.includes(from)) {
            findings.push(
                Finding.fromObject({
                    name: "alert invalid account",
                    description: `block account: ${from}`,
                    alertId: "MassDao_invalid_account_watch",
                    severity: FindingSeverity.Medium,
                    type: FindingType.Suspicious,
                })
            )
        }

        return findings;
    };
}

module.exports = {
    handleTransaction: provideHandleTransaction(),
    // handleBlock,
};
