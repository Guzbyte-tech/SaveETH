import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const tokenAddress = "0x2CD296A42a66725069fDBfF230500c0066a4dAD1";

const SaveERC20Module = buildModule("SaveERC20Module", (m) => {

    const save = m.contract("SaveERC20", [tokenAddress]);

    return { save };
});

export default SaveERC20Module;