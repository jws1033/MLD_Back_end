  
pragma solidity ^0.5.0;

// experimental
pragma experimental ABIEncoderV2;

contract myLittleDoctor {
    struct survey {
        string createAt;
        string surveyNum;
        string[] surveyQuestion;
        string[] surveyResult;
    }

    struct research {
        survey[] surveys;
    }

    // address owner;
    mapping(address => research) private researchs;
    
    function saveSurvey(
        address sender,
        string memory createAt,
        string memory surveyNum,
        string[] memory surveyQuestion,
        string[] memory surveyResult
    ) public {
        survey memory newServey = survey({
            createAt: createAt,
            surveyNum: surveyNum,
            surveyQuestion: surveyQuestion,
            surveyResult: surveyResult
        });
        researchs[sender].surveys.push(newServey);
    }

    function querySurvey(address sender)
        public
        view
        returns (survey[] memory)
    {
        return researchs[sender].surveys;
    }
}