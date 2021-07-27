  //先讀取今天時間，讓今天以前的時間無法讀取
  let toDay = new Date();
	let selectDate = new Array; 
	let selectDateIndex = 0; 
	let selectDateCompare = 0; 
	let selectFather = document.querySelector(".sel_year");
	for(var temp = toDay.getFullYear(); temp <= toDay.getFullYear() + 10; temp = temp + 1){
		let selectOption = document.createElement("option");
		selectOption.value = temp;
		let textNode = document.createTextNode(temp);
		selectOption.appendChild(textNode);
		selectFather.appendChild(selectOption);
	};

	let selectYear = toDay.getFullYear();
	let selectMonth = toDay.getMonth();
	let selectFatherOption = document.querySelectorAll("select.sel_year option");
	let selectMonthOption = document.querySelectorAll("select.sel_month option");
	let tdDate = 1;
	for(var temp = 0; temp < selectFatherOption.length; temp = temp + 1){
		if(selectYear == selectFatherOption[temp].value){
			selectFatherOption[temp].selected = true; 
		}
	};
	selectMonthOption[selectMonth].selected = true;
	selectCalendar();

	function selectCalendar(){
		let starDay = new Date(parseInt(selectYear), parseInt(selectMonth), 1);
		let lastDay = new Date(parseInt(selectYear), parseInt(selectMonth) + 1, 0);
		let tbody = document.querySelector("tbody");
		let tr = document.createElement("tr");
		let countDay = starDay.getDay();
		while(tbody.hasChildNodes()){
			tbody.removeChild(tbody.firstChild);
		};
		for(var temp = 0; temp < starDay.getDay(); temp = temp + 1){
			var td = document.createElement("td");
		tr.appendChild(td);
		};
		for(var temp = 1; temp <= lastDay.getDate(); temp = temp + 1){
			if(starDay.getFullYear() == toDay.getFullYear() && starDay.getMonth() == toDay.getMonth() && temp < toDay.getDate()){//不可點選之日期屬性＆樣式設定
				if(countDay == 6){
					countDay = 0;
					var td = document.createElement("td");
					td.innerText = temp;
					td.style.cursor = "pointer";
					td.style.opacity = 0.5;
					td.classList.add("tdClander");
					td.classList.add("tdAlert");
					tr.appendChild(td);
					tbody.appendChild(tr);
					tr = document.createElement("tr");
				}
				else{
					countDay = countDay + 1;
					var td = document.createElement("td");
					td.innerText = temp;
					td.style.cursor = "pointer";
					td.style.opacity = 0.5;
					td.classList.add("tdClander");
					td.classList.add("tdAlert");
					tr.appendChild(td);
				}
			}
			else{
				if(countDay == 6){
					countDay = 0;
					var td = document.createElement("td");
					td.innerText = temp;
					td.style.cursor = "pointer";
					td.classList.add("tdClander");
					tr.appendChild(td);
					tbody.appendChild(tr);
					tr = document.createElement("tr");
				}
				else{
					countDay = countDay + 1;
					var td = document.createElement("td");
					td.innerText = temp;
					td.style.cursor = "pointer";
					td.classList.add("tdClander");
					tr.appendChild(td);
				}
			}
		};
		tbody.appendChild(tr);
		
		selectDateColor();//點擊區間出現底色
		//1.記錄點選日期
		//2.比較日期大小（大的--> 歸還日期；小的-->租借日期）
		//3.兩日期相減是否有超過30天，有的話就不紀錄並跳出警告
		//4.若兩者相減小於30天，則將租借日期、歸還日期、租借天數、租借價格顯示在各文字後方
		//5.若點選今天以前的日期會跳出警告
		document.querySelectorAll(".tdClander").forEach(function(td, tdindex, tdarray){
			td.addEventListener("click", function(e){
				let tdCheck = tdarray[tdindex].classList.contains("tdAlert");
				if(tdCheck == true){
					alert("Start date must later than today!");
				}
				else{
					for(var temp = 0; temp < tdarray.length; temp = temp + 1){
						tdarray[temp].style.backgroundColor = "";
						tdarray[temp].style.color = "";
						tdarray[temp].style.textShadow = "";
					};
					tdarray[tdindex].style.backgroundColor = "rgb(188, 143, 143)";
					tdarray[tdindex].style.color = "white";
					tdarray[tdindex].style.textShadow = "-1px -1px 0 black, 1px -1px 0 black, -1px 1px 0 black, 1px 1px 0 black";
					tdDate = tdindex + 1;
					if(selectDateIndex == 0){
						selectDate[selectDateIndex] = new Date(parseInt(selectYear), parseInt(selectMonth), tdDate);
						document.querySelector(".start_date").innerText = `Start date：${selectDate[selectDateIndex].getFullYear()}/${selectDate[selectDateIndex].getMonth() + 1}/${selectDate[selectDateIndex].getDate()}`;
						selectDateIndex = selectDateIndex + 1;
					}
					else if(selectDateIndex == 1){
						selectDate[selectDateIndex] = new Date(parseInt(selectYear), parseInt(selectMonth), tdDate);
						if(selectDate[selectDateIndex] > selectDate[0] && Math.abs(parseInt(selectDate[0] - selectDate[selectDateIndex])/1000/60/60/24) + 1 <= 30){
							document.querySelector(".end_date").innerText = `End date：${selectDate[selectDateIndex].getFullYear()}/${selectDate[selectDateIndex].getMonth() + 1}/${selectDate[selectDateIndex].getDate()}`;
							document.querySelector(".count_date").innerText = `Total：${Math.abs(parseInt(selectDate[0] - selectDate[1])/1000/60/60/24) + 1} days`;
							document.querySelector(".price_all").innerText = `Price：$${(Math.abs(parseInt(selectDate[0] - selectDate[1])/1000/60/60/24) + 1) * 1200}`;
							selectDateIndex = selectDateIndex + 1;
							selectDateCompare = 1;
						}
						else if(selectDate[selectDateIndex] <= selectDate[0] && Math.abs(parseInt(selectDate[0] - selectDate[selectDateIndex])/1000/60/60/24) + 1 <= 30){
							selectDate[selectDateIndex] = selectDate[0];
							selectDate[0] = new Date(parseInt(selectYear), parseInt(selectMonth), tdDate);
							document.querySelector(".start_date").innerText = `Start date：${selectDate[0].getFullYear()}/${selectDate[0].getMonth() + 1}/${selectDate[0].getDate()}`;
							document.querySelector(".end_date").innerText = `End date：${selectDate[selectDateIndex].getFullYear()}/${selectDate[selectDateIndex].getMonth() + 1}/${selectDate[selectDateIndex].getDate()}`;
							document.querySelector(".count_date").innerText = `Total：${Math.abs(parseInt(selectDate[0] - selectDate[1])/1000/60/60/24) + 1} days`;
							document.querySelector(".price_all").innerText = `Price：$${(Math.abs(parseInt(selectDate[0] - selectDate[1])/1000/60/60/24) + 1) * 1200}`;
							selectDateIndex = selectDateIndex + 1;
							selectDateCompare = 1;
						}
						else{
							alert("Max renting duration is 30 days");
							tdarray[tdindex].style.backgroundColor = "";
							tdarray[tdindex].style.color = "";
							tdarray[tdindex].style.textShadow = "";
							selectDate[selectDateIndex] = NaN;
						}
					}
					if(selectDateCompare == 1){
						let tempDate = new Date(parseInt(selectYear), parseInt(selectMonth), tdDate);
						if(tempDate <= selectDate[0] && Math.abs(parseInt(selectDate[1] - tempDate)/1000/60/60/24) + 1 <= 30){
							selectDate[0] = tempDate;
							document.querySelector(".start_date").innerText = `Start date：${selectDate[0].getFullYear()}/${selectDate[0].getMonth() + 1}/${selectDate[0].getDate()}`;
							document.querySelector(".end_date").innerText = `End date：${selectDate[1].getFullYear()}/${selectDate[1].getMonth() + 1}/${selectDate[1].getDate()}`;
							document.querySelector(".count_date").innerText = `Total：${Math.abs(parseInt(selectDate[0] - selectDate[1])/1000/60/60/24) + 1} days`;
							document.querySelector(".price_all").innerText = `Price：$${(Math.abs(parseInt(selectDate[0] - selectDate[1])/1000/60/60/24) + 1) * 1200}`;
						}
						else if(tempDate > selectDate[0] && Math.abs(parseInt(selectDate[0] - tempDate)/1000/60/60/24) + 1 <= 30){
							selectDate[1] = tempDate;
							document.querySelector(".start_date").innerText = `Start date：${selectDate[0].getFullYear()}/${selectDate[0].getMonth() + 1}/${selectDate[0].getDate()}`;
							document.querySelector(".end_date").innerText = `End date：${selectDate[1].getFullYear()}/${selectDate[1].getMonth() + 1}/${selectDate[1].getDate()}`;
							document.querySelector(".count_date").innerText = `Total：${Math.abs(parseInt(selectDate[0] - selectDate[1])/1000/60/60/24) + 1} days`;
							document.querySelector(".price_all").innerText = `Price：$${(Math.abs(parseInt(selectDate[0] - selectDate[1])/1000/60/60/24) + 1) * 1200}`;
						}
						else{
							alert("Max renting duration is 30 days");
							tdarray[tdindex].style.backgroundColor = "";
							tdarray[tdindex].style.color = "";
							tdarray[tdindex].style.textShadow = "";
						};
					};
				};
				selectDateColor();
			});
		});
	};
	//決定需要上色的區塊
	function selectDateColor(){
		if(isNaN(selectDate[1]) == true){
			if(isNaN(selectDate[0]) == false){
				document.querySelectorAll(".tdClander").forEach(function(td, tdindex, tdarray){
					let checkDate = new Date(parseInt(selectYear), parseInt(selectMonth), tdindex + 1);
					if(selectDate[0].getFullYear() == checkDate.getFullYear() && selectDate[0].getMonth() == checkDate.getMonth() && selectDate[0].getDate() == checkDate.getDate()){
						tdarray[tdindex].style.backgroundColor = "rgb(188, 143, 143)";
						tdarray[tdindex].style.color = "white";
						tdarray[tdindex].style.textShadow = "-1px -1px 0 black, 1px -1px 0 black, -1px 1px 0 black, 1px 1px 0 black";
					}
				});
			}
		}
		else{
			document.querySelectorAll(".tdClander").forEach(function(td, tdindex, tdarray){
				for(var temp = 0; temp < tdarray.length; temp = temp + 1){
					let checkDate = new Date(parseInt(selectYear), parseInt(selectMonth), temp + 1);
					if(selectDate[0] <= checkDate && checkDate <= selectDate[1]){
						tdarray[temp].style.backgroundColor = "rgb(188, 143, 143)";
						tdarray[temp].style.color = "white";
						tdarray[temp].style.textShadow = "-1px -1px 0 black, 1px -1px 0 black, -1px 1px 0 black, 1px 1px 0 black";
					}
				};
			});
		}
	};
	document.querySelector(".sel_year").addEventListener("change", function(){
		selectYear = document.querySelector(".sel_year").value;
		if(parseInt(selectYear) == toDay.getFullYear() && parseInt(selectMonth) < toDay.getMonth()){ 
			alert("Previous time is not available");
			selectMonth = toDay.getMonth();
			selectFatherOption[0].selected = true;
			selectMonthOption[selectMonth].selected = true;
		}
		selectCalendar();
	});
	document.querySelector(".sel_month").addEventListener("change", function(){
		selectMonth = document.querySelector(".sel_month").value;
		if(parseInt(selectYear) == toDay.getFullYear() && parseInt(selectMonth) < toDay.getMonth()){
			alert("Previous time is not available");
			selectMonth = toDay.getMonth();
			selectFatherOption[0].selected = true;
			selectMonthOption[selectMonth].selected = true;
		}
		selectCalendar();
	});
	//點擊next會跳到下一月份
	document.querySelector(".next_month").addEventListener("click", function(){
		if(parseInt(selectMonth) == 11){
			if(parseInt(selectYear) == toDay.getFullYear() + 10){
				alert("Later time will be available soon");
			}
			else{
				selectYear = parseInt(selectYear) + 1;
				selectMonth = 0;
				for(var temp = 0; temp < selectFatherOption.length; temp = temp + 1){
					if(temp + toDay.getFullYear() == parseInt(selectYear)){
						selectFatherOption[temp].selected = true;
					}
				};
				selectMonthOption[selectMonth].selected = true;
				selectCalendar();
			}
		}
		else{
			selectMonth = parseInt(selectMonth) + 1;
			selectMonthOption[selectMonth].selected = true;
			selectCalendar();
		}
	});
	//點擊Pre會跳到前一月份
	document.querySelector(".pre_month").addEventListener("click", function(){
		if(parseInt(selectMonth) == 0){
			selectYear = parseInt(selectYear) - 1;
			selectMonth = 11;
			for(var temp = 0; temp < selectFatherOption.length; temp = temp + 1){
				if(temp + toDay.getFullYear() == parseInt(selectYear)){
					selectFatherOption[temp].selected = true;
				}
			};
			selectMonthOption[selectMonth].selected = true;
			selectCalendar();
		}
		else{
			if(parseInt(selectYear) == toDay.getFullYear() && parseInt(selectMonth) == toDay.getMonth()){//選擇當月份以前的月份跳出警告
				alert("Previous time is not available");
			}
			else{
				selectMonth = parseInt(selectMonth) - 1;
				selectMonthOption[selectMonth].selected = true;
				selectCalendar();
			}
		}
	});
	//清除功能
	document.querySelector(".clear_all").addEventListener("click", function(){
		selectDate = NaN;
		selectDate = new Array;
		selectDateIndex = 0;
		selectDateCompare = 0;
		document.querySelectorAll(".tdClander").forEach(function(td, tdindex, tdarray){
			tdarray[tdindex].style.backgroundColor = "";
			tdarray[tdindex].style.color = "";
			tdarray[tdindex].style.textShadow = "";
		});
		document.querySelector(".start_date").innerText = `Start date：`;
		document.querySelector(".end_date").innerText = `End date：`;
		document.querySelector(".count_date").innerText = `Total：`;
		document.querySelector(".price_all").innerText = `Price：`;
	});