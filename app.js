const fetch = require("node-fetch");
console.log("heyyy");
const TODOIST_API_ENDPOINT = "https://api.todoist.com/rest/v1";
const LEETCODE_API_ENDPOINT = "https://leetcode.com/graphql";
const DAILY_CODING_CHALLENGE_QUERY = `
query questionOfToday {
	activeDailyCodingChallengeQuestion {
		date
		userStatus
		link
		question {
			acRate
			difficulty
			freqBar
			frontendQuestionId: questionFrontendId
			isFavor
			paidOnly: isPaidOnly
			status
			title
			titleSlug
			hasVideoSolution
			hasSolution
			topicTags {
				name
				id
				slug
			}
		}
	}
}`;
/**
 * Sync LeetCode daily coding challenge to Todoist
 */
const syncLeetCodeCodingChallenge = async () => {
  const question = await fetchDailyCodingChallenge();

  const questionInfo = question.data.activeDailyCodingChallengeQuestion;
//   console.log(questionInfo);

  const questionTitle = questionInfo.question.title;
  const questionDifficulty = questionInfo.question.difficulty;
  const questionLink = `https://leetcode.com${questionInfo.link}`;
  console.log("the problem of the day for", questionInfo.date);
  console.log("problem name:", questionInfo.question.title);
  console.log("problem description:", questionInfo.question.difficulty);
  console.log("problem link: leetcode.com"+ questionInfo.link);
};

const fetchDailyCodingChallenge = async () => {
  console.log(`Fetching daily coding challenge from LeetCode API.`);

  const init = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query: DAILY_CODING_CHALLENGE_QUERY }),
  };

  const response = await fetch(LEETCODE_API_ENDPOINT, init);

  return response.json();
};

syncLeetCodeCodingChallenge();

// const createTodoistTask = async (question) => {
//   const questionInfo = question.data.activeDailyCodingChallengeQuestion;
//   console.log(questionInfo);

// }
