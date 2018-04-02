pragma solidity ^0.4.20;

contract SupplyChain{

    struct StockItem{
        bytes32 barCode;
        uint checkinTime;
    }

    StockItem[] stockItems;

    event Itemchecked(address scanner, uint time);

    mapping(address => StockItem[]) public Records;

    function ScanItem(bytes32 _barCode) returns(bool success){

        StockItem memory stockItem;
        stockItem.barCode = _barCode;
        stockItem.checkinTime = now;

        Records[msg.sender].push(stockItem);

        Itemchecked(msg.sender, stockItem.checkinTime);

        return true;
    }

    function getInfo() view returns(bytes32[], uint[]){ // this does not cost gas
        uint length = Records[msg.sender].length;

        bytes32[] memory codes = new bytes32[](length);
        uint[] memory times = new uint[](length);

        for (uint i=0; i < length; i++) {
            codes[i] = Records[msg.sender][i].barCode;
            times[i] = Records[msg.sender][i].checkinTime;
        }

        return (codes, times);

    }


}
