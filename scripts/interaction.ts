import { ethers } from "hardhat";

async function main() {
    const web3CXITokenAddress = "0x2CD296A42a66725069fDBfF230500c0066a4dAD1";
    const web3CXI = await ethers.getContractAt("IERC20", web3CXITokenAddress);

    const saveERC20ContractAddress = "0x26d7009A6446BbD30eD93B4532BD04aCb8169325";
    const saveERC20 = await ethers.getContractAt("ISaveERC20", saveERC20ContractAddress);

    // Approve savings contract to spend token
    const approvalAmount = ethers.parseUnits("1000", 18);

    const approveTx = await web3CXI.approve(saveERC20, approvalAmount);
    approveTx.wait();

    const contractBalanceBeforeDeposit = await saveERC20.getContractBalance();
    console.log("Contract balance before deposit :::", contractBalanceBeforeDeposit);

    const depositAmount = ethers.parseUnits("150", 18);
    const depositTx = await saveERC20.deposit(depositAmount);

    console.log(depositTx);

    depositTx.wait();

    const contractBalanceAfterDeposit = await saveERC20.getContractBalance();

    console.log("Contract balance after deposit:::", contractBalanceAfterDeposit);



    // Withdrawal Interaction
    const withdrawAmt = ethers.parseUnits("140", 18);
    const balanceBefore = await saveERC20.getContractBalance();
    const withdrawTx = await saveERC20.withdraw(withdrawAmt);
    const balanceAfter = await saveERC20.getContractBalance();

    console.log("balance before withdrawal:::", balanceBefore);


    console.log(withdrawTx);

    await withdrawTx.wait();

    console.log("Balance After withdrawal:::", balanceAfter);

    

    
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
