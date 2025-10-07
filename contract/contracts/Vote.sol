// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;

contract Vote {
    struct Proposal {
        string title;
        string description;
        string[] options;
        uint256 startTime;
        uint256 endTime;
        bool exists;
    }

    Proposal[] public proposals;

    mapping(uint256 => mapping(uint256 => uint256)) public votes; // proposalIndex => optionIndex => voteCount
    mapping(uint256 => mapping(address => bool)) public isVoted; // proposalIndex => address => isVoted

    address public admin;

    constructor() {
        admin = msg.sender;
    }

    modifier onlyAdmin() {
        require(msg.sender == admin, "Not admin");
        _;
    }

    function createProposal(
        string memory _title,
        string memory _description,
        string[] memory _options
    ) public onlyAdmin {
        require(_options.length > 1, "Need at least 2 options");

        proposals.push(
            Proposal({
                title: _title,
                description: _description,
                options: _options,
                startTime: block.timestamp,
                endTime: block.timestamp + 1 days,
                exists: true
            })
        );
    }

    function getProposals() public view returns (Proposal[] memory) {
        return proposals;
    }

    function vote(
        address voter,
        uint256 proposalIndex,
        uint256 optionIndex
    ) external {
        require(proposalIndex < proposals.length, "Invalid proposal index");
        require(
            optionIndex < proposals[proposalIndex].options.length,
            "Invalid option index"
        );
        require(!isVoted[proposalIndex][voter], "Already voted");
        isVoted[proposalIndex][voter] = true;
        votes[proposalIndex][optionIndex]++;
    }

    // 获取某个 proposal 的投票结果
    function getProposalResult(
        uint256 proposalIndex
    ) public view returns (uint256[] memory) {
        require(proposalIndex < proposals.length, "Invalid proposal index");
        uint256[] memory result = new uint256[](
            proposals[proposalIndex].options.length
        );
        for (uint256 i = 0; i < proposals[proposalIndex].options.length; i++) {
            result[i] = votes[proposalIndex][i];
        }
        return result;
    }

    // 获取用户对某个 proposal 的投票状态
    function getUserVoteStatus(
        uint256 proposalIndex,
        address user
    ) public view returns (bool) {
        return isVoted[proposalIndex][user];
    }
}
