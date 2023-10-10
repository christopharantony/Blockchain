pragma solidity ^0.4.17;
// linter warnings (red underline) about pragma version can igonored!

contract TestArray {
    uint[] public myArray;

    function TestArray() public {
        myArray.push(0);
        myArray.push(10);
        myArray.push(30);
    }

    function getArrayLength() public view returns (uint) {
        return myArray.length;
    }

    function getFirstElement() public view returns (uint) {
        return myArray[0];
    }

    function findElementByIndex(uint index) public view returns (uint) {
        return myArray[index];
    }

    function pushMyArray(uint value) public {
        myArray.push(value);
    }

    function getMyArray() public view returns (uint[]) {
        return myArray;
    }
}
