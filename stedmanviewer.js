addStedmanView();
function addStedmanView() {
		
	const details = document.getElementsByClassName("course-layout");
	var clone = details[0].cloneNode(true);
    
	var top = clone.insertRow(0);
    cell = top.insertCell(0);
	cell.innerHTML = "Experimental Stedman view";
	cell.style.whiteSpace = "nowrap";
	
	var tData = Array.from(clone.rows);
	var courses = tData.slice(2);
	var numCourses = courses.length;
	
	const includesCourseLength = tData[1].getElementsByClassName("courselength").length > 0;
	
	// Build list of calling positions
	var positions = Array.from(tData[1].cells);
	
	// Remove course head
	positions = positions.slice(1);
	
	// Remove coursing orders if needed
	var includesCoursingOrders = false;
	const firstCall = positions[0].textContent;
	var numCalls = positions.length;
	for(var idxP = 1; idxP<positions.length; idxP++) {
		if(positions[idxP].textContent == firstCall) {
			includesCoursingOrders = true;
			numCalls = idxP;
		}
	}
	if(includesCoursingOrders)
		positions = positions.slice(0, numCalls);
	else if(includesCourseLength)
		positions.slice(0,-1);

	// Add alternative representation of calling
	positions = positions.map(p => p.textContent);
	for(var cdx=0; cdx<numCourses; cdx++) {
		var newFormatString = buildStringFromCalling(courses[cdx], positions);
		cell = courses[cdx].insertCell(1);
		cell.innerHTML = newFormatString;
		cell.style.textAlign = "left";
		
		if(includesCourseLength) {
			Array.from(courses[cdx].cells).slice(2, -1).forEach(t => t.parentNode.removeChild(t));
		}
		else {
			Array.from(courses[cdx].cells).slice(2).forEach(t => t.parentNode.removeChild(t));
		}
	}
	
	// Hide calling positions in first row
	Array.from(tData[1].cells).slice(1).forEach(t => t.parentNode.removeChild(t));
	
	const parentSection = document.getElementsByClassName("composition-layout-container");
	parentSection[0].appendChild(clone);
}

function buildStringFromCalling(row, positions) {
	
	var str = "";
	for(var idx=1;idx<=positions.length;idx++) {
		if(row.cells[idx].textContent.trim() == '–')
			str += positions[idx-1] + ".";
		else if (row.cells[idx].textContent.trim() == 's')
			str += "s" + positions[idx-1] + ".";
	}
	
	// Remove final '.'
	if (str.length > 0)
		str = str.slice(0, -1);
		
	return str;
}

function minimiseCell(c) {
	c.style.visibility = 'hidden';
	c.width = 0;
}