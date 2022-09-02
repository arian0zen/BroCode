const fetch = require("node-fetch");
const puppeteer = require("puppeteer");

// APIs for POTDS
let today = new Date();
let date = today.getDate()+'-'+ (today.getMonth()+1)+'-'+today.getFullYear();

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


/*Sync LeetCode daily coding challenge to Todoist*/


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
  console.log("***********")
  console.log("***********")
  console.log("   ");


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
  console.log("***********")
  console.log("***********")
  console.log("   ");
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




const syncCodingNinjasChallenge = async () => {
	  const question_codingninjas = await fetchDailyCodingNinjas();
	  console.log("***********")
	  console.log("***********")
	  console.log("   ");
	  console.log("Coding Ninjas: POTD");
	  console.log("the problem of the day moderate", question_codingninjas.data.details.MODERATE.problem.name);
	  console.log("problem name:", question_codingninjas.data.details.MODERATE.problem.offering_name);
	  console.log("problem id:", question_codingninjas.data.details.MODERATE.problem.id);
	  console.log("***********")
	  console.log("***********")
	  console.log("   ");
};
const fetchDailyCodingNinjas = async () => {
	console.log(`Fetching daily coding challenge from coding ninjas API.`);
  
	const init = {
	  method: "GET",
	  headers: { "Content-Type": "application/json" },
	};
  
	const response = await fetch(CodingNinjas_API_ENDPOINT, init);
  
	return response.json();
};

/*sync CodeChefs */

// using puppeteer to grab the link for potd codechef
const grab_chefLink = async () => {
	const browser = await puppeteer.launch({headless: true});
	const page = await browser.newPage();
	await page.setDefaultNavigationTimeout(0);
	await page.goto('https://www.codechef.com');
	var link = await page.$$eval(".m-button-1",
                element=> element[1].href)
    return link;
  };


  
  const link_grabbed = async ()=> {
	const problem_link = await grab_chefLink();
	// console.log(problem_link);
	problem_code = problem_link.replace(/[^A-Z]/g, '');
	const codechef_API_ENDPOINT = `https://www.codechef.com/api/contests/PRACTICE/problems/${problem_code}`;
	
	return codechef_API_ENDPOINT;
  }

//fetching API now
const syncCodeChefChallenge = async () => {
	const question_codechef = await fetchDailyCodeChef();
	console.log("***********")
	console.log("***********")
	console.log("   ");
	console.log("Code Chef: POTD for", date);
	console.log("Problem name: ",question_codechef.problem_name);
	console.log("Problem difficulty: ",question_codechef.difficulty_rating);
	console.log("problem link: ", `https://www.codechef.com/problems/${question_codechef.problem_code}` );

	console.log("***********")
	console.log("***********")
	console.log("   ");
};


const fetchDailyCodeChef = async () => {
	console.log(`Fetching daily coding challenge from CODE CHEF.`);
	var codechef_API_ENDPOINT = await link_grabbed();
	
  
	const init = {
	  method: "GET",
	  headers: { "Content-Type": "application/json" },
	};
  
	const response = await fetch(codechef_API_ENDPOINT, init);
  
	return response.json();
};





// link_grabbed();
syncCodeChefChallenge(); 
syncLeetCodeCodingChallenge();
syncGFGChallenge();
syncCodingNinjasChallenge();




//udemy

// const grab_udemyLink = async () => {
// 	const browser = await puppeteer.launch({headless: false});
// 	const page = await browser.newPage();
// 	await page.setDefaultNavigationTimeout(0);
// 	await page.goto('https://course.rewayatcafe.com/742MVaw');
// 	var title = await page.title();
// 	console.log(title);
//   };

//   grab_udemyLink();
