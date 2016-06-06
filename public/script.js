var app = angular.module("ngTask", []);
var MainController = function($scope) {

    var resetIndices = function(arr) {
        for(var i=0; i<arr.length; i++) {
            arr[i].index = i;
        }
    };

    $scope.addTask = function(task) {
        if(task !== "") {

            var note = {
                content: task,
                index: $scope.tasks.length,
                status: false
            };
            $scope.tasks.push(note);
            $('input').val('');
            $scope.taskInput = "";
            $scope.count+=1;
            resetIndices($scope.tasks);
            $scope.updateCounter();
        }
    };
    
    $scope.deleteTask =function(index) {
        $scope.tasks.splice(index, 1);
        var currentItem = $('#' +index +' .task-content');
        if(currentItem.hasClass("note-done")) {
            doneCounter -=1;
        } else {
            console.log($scope.tasks);
            $scope.updateCounter();
        }
        console.log($scope.currentCount);
        resetIndices($scope.tasks);
    };
    
    $scope.doneTask = function(index) {
        $('#' +index +' .task-content').toggleClass("note-done");
        var imgSrc = $('#' +index +' .status-button');
        if(imgSrc.attr("src") === "images/task-not-done.png") {
            // $scope.count -=1;
            doneCounter +=1;
            $scope.updateCounter();
            console.log(doneCounter);
            imgSrc.attr("src", "images/task-done.png");
            $scope.tasks[index].status = true;
        } else {
            // $scope.count +=1;
            doneCounter -=1;
            $scope.updateCounter();
            console.log(doneCounter);
            imgSrc.attr("src", "images/task-not-done.png");
            $scope.tasks[index].status = false;
        }
    };

    $scope.updateCounter = function() {
        $scope.currentCount = $scope.tasks.length - doneCounter;
    };

    $scope.showAll = function() {

    };

    $scope.showActive = function() {
    };
    


    $scope.tasks = [];

    $scope.count = $scope.tasks.length;
    $scope.currentCount =0;
    var doneCounter = 0;
    $scope.updateCounter();
    
    
    var viewState = "all";  
};



app.controller('MainController', MainController);