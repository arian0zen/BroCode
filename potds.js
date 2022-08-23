// APIs for POTDS
const fetch = require("node-fetch");


// console.log("heyyy");
// const TODOIST_API_ENDPOINT = "https://api.todoist.com/rest/v1";
const CodingNinjas_API_ENDPOINT = `https://api.codingninjas.com/api/v3/public_section/potd/problem_list?date=${date}`;
const GFG_API_ENDPOINT =
  "https://practiceapi.geeksforgeeks.org/api/v1/problems-of-day/problem/today/";
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
  console.log("LeetCode: POTD");

  const questionInfo = question.data.activeDailyCodingChallengeQuestion;


  const questionTitle = questionInfo.question.title;
  const questionDifficulty = questionInfo.question.difficulty;
  const questionLink = `https://leetcode.com${questionInfo.link}`;
  console.log("the problem of the day for", questionInfo.date);
  console.log("problem name:", questionInfo.question.title);
  console.log("problem description:", questionInfo.question.difficulty);
  console.log("problem link: leetcode.com" + questionInfo.link);
  console.log("   ")
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




/*sync Geeks for geeks */


const syncGFGChallenge = async () => {
  const question_gfg = await fetchDailyCodingGFG();
  console.log("***********")
  console.log("***********")
  console.log("   ");
  console.log("Geeks for Geeks: POTD");

  console.log("the problem of the day for", question_gfg.date);
  console.log("problem name:", question_gfg.problem_name);
  console.log("problem description:", question_gfg.difficulty);
  console.log("problem link:", question_gfg.problem_url);
};

const fetchDailyCodingGFG = async () => {
  console.log(`Fetching daily coding challenge from GFG api.`);

  const init = {
    method: "GET",
    headers: { "Content-Type": "application/json" }
  };

  const response = await fetch(GFG_API_ENDPOINT, init);

  return response.json();
};



/*Sync Coding Ninjas */
let today = new Date();
let date = today.getDate()+'-'+ (today.getMonth()+1)+'-'+today.getFullYear();

// console.log("this is today",CodingNinjas_API_ENDPOINT);

const syncCodingNinjasChallenge = async () => {
	  const question_codingninjas = await fetchDailyCodingNinjas();
	  console.log("***********")
	  console.log("***********")
	  console.log("   ");
	  console.log("Coding Ninjas: POTD");
	  console.log("the problem of the day moderate", question_codingninjas.data.details.MODERATE.problem.name);
	  console.log("problem name:", question_codingninjas.data.details.MODERATE.problem.offering_name);
	  console.log("problem id:", question_codingninjas.data.details.MODERATE.problem.id);
};
const fetchDailyCodingNinjas = async () => {
	console.log(`Fetching daily coding challenge from LeetCode API.`);
  
	const init = {
	  method: "GET",
	  headers: { "Content-Type": "application/json" },
	};
  
	const response = await fetch(CodingNinjas_API_ENDPOINT, init);
  
	return response.json();
};

syncLeetCodeCodingChallenge();
syncGFGChallenge();
syncCodingNinjasChallenge();
