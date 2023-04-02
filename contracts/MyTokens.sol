// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";

contract MyTokens is ERC1155 {
    uint256 public constant ELEMENTAL_MANIPULATION = 0;
    uint256 public constant MIND_CONTROL = 1;
    uint256 public constant TELEKINESIS = 2;
    uint256 public constant IMMORTALITY = 3;
    uint256 public constant INVISIBILITY = 4;
    uint256 public constant WIZARD = 5;
    event transferSuccessful(address _transferredTo, uint256 _id, uint256 _amount);
    event batchTransferSuccessful(address _transferredTo, uint256[] _id, uint256[] _amount);
    constructor() ERC1155("https://gateway.pinata.cloud/ipfs/QmRPHKoMGjG5cchMfquiEwti7vest2xN2D1pM7Up4JcNwz/{id}.json") {
        _mint(msg.sender, ELEMENTAL_MANIPULATION, 1000, "");
        _mint(msg.sender, MIND_CONTROL, 1000, "");
        _mint(msg.sender, TELEKINESIS, 1000, "");
        _mint(msg.sender, IMMORTALITY, 1000, "");
        _mint(msg.sender, INVISIBILITY, 1000, "");
        _mint(msg.sender, WIZARD, 1, "");

    }
    function transferTokens ( address   _from,  address  _to,uint256 _id, uint256 _amount,  string memory _data )   public{
        bytes memory data = abi.encode(_data);
        _safeTransferFrom(_from,_to,_id,_amount,data);
        emit transferSuccessful(_to,_id,_amount);

    }
    function transferTokensInBatch ( address   _from,  address  _to, uint256[] memory _id, uint256[] memory _amount,  string memory _data ) public{
        bytes memory data = abi.encode(_data);
        _safeBatchTransferFrom(_from,_to,_id,_amount,data);
        emit batchTransferSuccessful(_to,_id,_amount);

    }
    }