var app = angular.module("ngTask", []);
var MainController = function($scope) {

    var resetIndices = function(arr) {
        for(var i=0; i<arr.length; i++) {
            arr[i].index = i;
        }
    };

    var calcRemaining = function() {
        var arr = $scope.tasks;
        $scope.totalDone = 0;
        $scope.totalLeft = 0;
        for(var i=0; i<arr.length; i++) {
            if( arr[i].status === true) {
                $scope.totalDone+=1;
            } else if(arr[i].status === false) {
                $scope.totalLeft +=1;
            }
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
        calcRemaining();

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
        calcRemaining();
    };

    $scope.doneTask = function(index) {

            if($scope.tasks[index].status === false) {
                doneCounter +=1;
                $scope.updateCounter();
                console.log(doneCounter);
                $scope.tasks[index].status = true;
            } else {
                doneCounter -=1;
                $scope.updateCounter();
                console.log(doneCounter);
                $scope.tasks[index].status = false;
            }
        calcRemaining();
    };

    $scope.updateCounter = function() {
        $scope.currentCount = $scope.tasks.length - doneCounter;
    };

    $scope.showAll = function() {
        $scope.changeView ="";
        $scope.updateCounter();
    };

    $scope.showActive = function() {
        $scope.changeView = false;
        $scope.updateCounter();
        calcRemaining();
    };

    $scope.showCompleted = function() {
        $scope.changeView = true;
        $scope.updateCounter();
        calcRemaining();
    };
    

    $scope.tasks = [];

    $scope.count = $scope.tasks.length;
    $scope.currentCount =0;
    var doneCounter = 0;
    $scope.totalDone = 0;
    $scope.totalLeft = 0;

};



app.controller('MainController', MainController);