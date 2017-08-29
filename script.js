function createGraph (wrapper) {
            
    function drawChart (valNum,inputArray) {
        
        function calculateBarInfo (notch,rgbVal) {
            let xLabels = document.getElementsByClassName('xAxisLabels');

            for (let i = 0; i < xLabels.length; i++) {
                let height = notch * inputArray[1][i];
                let item = xLabels[i];      
                item.style.height = height + "px";
                item.style.top = '3.25px';
                item.onmouseover = function () {
                    this.style.boxShadow = '3px 3px 4px 0px #888888';
                    this.style.bottom = '5px';
                    this.style.cursor = 'pointer';
                    this.nextSibling.style.color = 'rgb(0,255,255)';
                }
                item.onmouseout = function () {
                    this.style.boxShadow = '2px 2px 3px 0px #888888';
                    this.style.bottom = '0';
                    this.style.cursor = 'default';
                    this.nextSibling.style.color = '#000000';
                }                            

                let colorVal = rgbVal / valNum;
                let color = Math.ceil(rgbVal - colorVal);

                rgbVal = rgbVal - color;

                if (rgbVal <= 1) {
                    rgbVal = 255;
                    item.style.backgroundColor = "rgb("+"0"+","+rgbVal+","+rgbVal+")";
                } else {
                    item.style.backgroundColor = "rgb("+"0"+","+rgbVal+","+rgbVal+")";
                }
            }
        }                 
        
        function createYaxis (graphWrapper,xAxis) {

            function yAxisTopValue () {
                let highestNumber = Math.max.apply(Math,inputArray[1]);  
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
            let rgbVal = 255; // sets RGB color value for initial bar 
            
            calculateBarInfo(notch,rgbVal); 
        }         
    
        function createXaxis (graphWrapper) {
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
            createYaxis(graphWrapper,xAxis);
        }        
          
        function createGraphWrapper () {    
            let graphWrapper = document.createElement('div');
            let graphWrapperTxt = document.createAttribute('id');
            graphWrapperTxt.value = 'graphWrapper';
            graphWrapper.setAttributeNode(graphWrapperTxt);
            graphWrapper.style.width = ((valNum * 5) + 3) + 'em';
            graphWrapper.style.minWidth = '9em';
            wrapper.appendChild(graphWrapper);
            createXaxis(graphWrapper);
        }
        createGraphWrapper();
    }            

    function collectValues () {
        let graphTitle = prompt("Enter the name of your bar graph");
        document.getElementsByTagName('h1')[0].innerHTML = graphTitle;

        let inputArray = [[],[]];
        
        let valNum = prompt("How many items do you want in the bar chart?");
            
        while (isNaN(valNum) || valNum == '') {
            alert("Please enter a valid number");
            valNum = prompt("How many items do you want in the bar chart?");
        }
        
        for (let l = 0; l < valNum; l++) {
            let count = l + 1;
            let item = prompt("Enter item #" + count + " : ");
            let value = prompt("Enter value of " + item + " : ");
            
            while (isNaN(value) || value == '') {
                alert("Please enter a valid number");
                value = prompt("Enter value of " + item + " : ");
            }                    
            
            inputArray[0][l] = item;
            inputArray[1][l] = value
        }
        drawChart(valNum,inputArray);
    }
            
    function resetButton () {
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
    }              
    
    collectValues();                            
    resetButton();
}
          
function pageWrapper () {
    
    // Creates initial page wrapper for graph
    let wrapper = document.createElement('div');
    let wrapperId = document.createAttribute('id');
    wrapperId.value = 'wrapper';
    wrapper.setAttributeNode(wrapperId);
    document.body.appendChild(wrapper);        
        
    // Creates customized graph title
    let title = document.createElement('h1');
    let titleTxt = document.createTextNode('Create a Bar Graph');
    title.appendChild(titleTxt);
    wrapper.appendChild(title);        

    // Create graph button
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
            createGraph(wrapper);
        }
    }
        
}

window.onload = function () {
    pageWrapper();
}
