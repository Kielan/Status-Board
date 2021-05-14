const REST_DATA = [
  {
    id: "idtext7",
		complete: false,
		description: "Working on a longer period time frame allows for better estimation of a task's complexity",
    title: "title7",
    team: "team",
    attach: 5,
    status: "1/3",
    score: { days: 15, colors: { bg: "#FFEEEF", text: "#FC5A5A" } },
    line: "70",
		subTaskList: [
			{ complete: true, id: 'genstring1', itemText: 'meet with team and discuss requirements' },
			{ complete: false, id: 'genstring2', itemText: 'assign initial round of tasks' },
			{ complete: false, id: 'genstring3', itemText: 'review' },
		],
    type: "In Progress",
    users: [{
      size: 32,
      name: "SF",
      color: "#FFC542",
    }]
  },
  {
    id: "idtext8",
		complete: true,
		description: "Break tasks into smaller tasks to identify the scope of a larger goal",
    title: "title8",
    team: "team",
    attach: 5,
    status: "Complete",
    score: { days: 15, colors: { bg: "#FFEEEF", text: "#FC5A5A" } },
    line: "100",
		subTaskList: [],
    type: "Complete",
    users: [{
      size: 32,
      name: "UL",
      color: "#FFC542",
    }]
  },
  {
    id: "idtext9",
		complete: true,	
		description: "Attach a larger goal to milestones. Milestones allow for analyzing cost expenditure and revenue to engineering timeframes and business cycles.",
    title: "title9",
    team: "team",
    attach: 5,
    status: "5/8",
    score: { days: 15, colors: { bg: "#FFEEEF", text: "#FC5A5A" } },
    line: "100",
		subTaskList: [],
		type: "In Progress",
    users: [{
      size: 32,
      name: "UL",
      color: "#FFC542",
    }]
  }
]

export { REST_DATA };
