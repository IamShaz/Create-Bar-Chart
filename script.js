window.onload = function () {
    
    let wrapper = document.createElement('div');
    let wrapperId = document.createAttribute('id');
    wrapperId.value = 'wrapper';
    wrapper.setAttributeNode(wrapperId);
    document.body.appendChild(wrapper);
    
    let title = document.createElement('h1');
    let titleTxt = document.createTextNode('Bar Graph');
    title.appendChild(titleTxt);
    wrapper.appendChild(title);

    let createGraphBtn = document.createElement('button'); 
    let createGraphBtnId = document.createAttribute('id');
    createGraphBtnId.value = 'create-graph';
    createGraphBtn.setAttributeNode(createGraphBtnId);
    let createGraphTxt = document.createTextNode('Create Graph');
    createGraphBtn.appendChild(createGraphTxt);
    wrapper.appendChild(createGraphBtn);
    createGraphBtn.onclick = function () {
        
        if (wrapper.children.length > 2) {
            window.location.reload();
        } else {           
            // collects values
            let inputArray = [[],[]];
            let valNum = prompt("How many items do you want in the bar chart?");

            for (let l = 0; l < valNum; l++) {
                let count = l + 1;
                let item = prompt("Enter item #" + count + " : ");
                let value = prompt("Enter value of " + item + " : ");

                inputArray[0][l] = item;
                inputArray[1][l] = value;
            }
            
            if (valNum == null || valNum == '') {
                alert('Please Enter Values');
                
            } else {
                let resetBtn = document.createElement('button');
                let resetBtnId = document.createAttribute('id');
                resetBtnId.value = 'reset';
                resetBtn.setAttributeNode(resetBtnId);
                let resetBtnTxt = document.createTextNode('Reset');
                resetBtn.appendChild(resetBtnTxt);
                wrapper.appendChild(resetBtn)
                resetBtn.onclick = function () {
                    window.location.reload();
                }                 
                // draws bar graph with values
                function drawChart (inputArray) {

                    let graphWrapper = document.createElement('div');
                    let graphWrapperTxt = document.createAttribute('id');
                    graphWrapperTxt.value = 'graphWrapper';
                    graphWrapper.setAttributeNode(graphWrapperTxt);
                    graphWrapper.style.width = ((valNum * 5) + 3) + 'em';
                    wrapper.appendChild(graphWrapper);


                    // CREATES X AXIS

                    let xAxis = document.createElement("ul");
                    xAxis.className = "xAxis";
                    graphWrapper.appendChild(xAxis);

                    for (let j = 0; j < inputArray[0].length; j++) { 
                        let li = document.createElement('li');
                        xAxis.appendChild(li).className = "xAxisLabels";
                        let xValues = document.createElement('p');
                        xValues.className = 'label';
                        let text = inputArray[0][j];                
                        let labelTxt = document.createTextNode(text);
                        xValues.appendChild(labelTxt);
                        xAxis.appendChild(xValues);


                    }        


                    // CREATES Y AXIS

                    function yAxisTopValue () {
                        var highestNumber = Math.max.apply(Math,inputArray[1]);  
                        return (highestNumber + 5) /5;
                    }

                    let yInterval = Math.ceil(yAxisTopValue()); // rounds number up
                    let graphHeight = yInterval * 5;
                    let graphValues = [];
                    let count = yInterval;

                    for (let l = 0; l < yInterval; l++) {
                        if (count <= graphHeight) {
                            graphValues[l] = count;
                        }
                        count += yInterval;
                    }

                    let label = document.getElementsByClassName('label');
                    for (let i = 0; i < label.length; i++) {
                        let labelHeight = label[i].clientHeight;
                        let heightEM = graphHeight * 16;
                        let graphWrapperHeight = (labelHeight + heightEM);
                        graphWrapper.style.height = graphWrapperHeight + 'px';
                    }                


                    // creates y axis html element
                    let yAxis = document.createElement('ul');
                    yAxis.className = "yAxis";
                    graphWrapper.insertBefore(yAxis, xAxis);
                    let yValuesSorted = graphValues.sort(function (a, b) {return b-a}); 

                    function lineWidth () {
                        let w = ((valNum * 5)) + 'em';
                        return w;
                    }

                    for (let k = 0; k < yValuesSorted.length; k++) { 
                        let yValues = document.createElement('li');
                        let text = yValuesSorted[k];
                        let valueTxt = document.createTextNode(text);
                        yValues.appendChild(valueTxt);
                        yAxis.appendChild(yValues);

                        let designLines = document.createElement('span');
                        designLines.className = 'design-lines';
                        designLines.style.width = lineWidth();
                        designLines.style.bottom = '0.75em';
                        yValues.appendChild(designLines);
                    }

                    let yValueZero = yAxis.appendChild(document.createElement('li'));
                    let yValZeroTxt = document.createTextNode('0');
                    yValueZero.appendChild(yValZeroTxt);

                    let yValueZeroLine = document.createElement('span');
                    yValueZeroLine.className = "design-lines";
                    yValueZeroLine.style.bottom = '0.75em';

                    yValueZeroLine.style.width = lineWidth();
                    yValueZero.appendChild(yValueZeroLine);

                    // y values are spaced by 3em/48px, each notch is 12px
                    let notch = 48 / yInterval;

                    function calculateBarHeight () {
                        let xLabels = document.getElementsByClassName('xAxisLabels');

                        for (let i = 0; i < xLabels.length; i++) {
                            let height = notch * inputArray[1][i];
                            let item = xLabels[i];      
                            item.style.height = height + "px";
                        }
                    }
                    calculateBarHeight();       
                }              
                drawChart(inputArray);         
            }                              
        }
    }
}
