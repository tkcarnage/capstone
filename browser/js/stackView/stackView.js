app.config(function ($stateProvider) {
    $stateProvider.state('stackView', {
        url: '/stackView/:stackId',
        templateUrl: 'js/stackView/stackView.html',
        controller: 'StackViewCtrl',
        resolve: {
            stack: function($http, $stateParams) {
                return $http.get('/api/stacks/' + $stateParams.stackId)
                .then(res => res.data);
            }
        }
    });
});

app.factory('StackViewFactory', function($http) {
    return {
        edit: function(obj) {
            return $http.put('/api/stacks/' + obj._id, obj)
            .then (response => response.data);
        },
        getTestWithStatus: function (arr, status) {
            return arr.filter(function(ele){
                return ele.body.result === status;
            });
        },
        getPercent: function(arr, totallen) {
            return (arr.length / totallen) * 100;
        }
    };
});

app.controller('StackViewCtrl', function($scope, $state, $log, stack, StackViewFactory) {
    $scope.stack = stack;
    $scope.removeFromStack = function (index) {
        $scope.stack.tests.splice(index, 1);
        $scope.$evalAsync();
    };
    $scope.submitStack = function () {
        StackViewFactory.edit($scope.stack)
        .then(() => $scope.$evalAsync() )
        .then(() => alert("Your changes were saved!"))
        .catch($log.error);
    };


    $scope.newTests = StackViewFactory.getTestWithStatus($scope.stack.tests, "New");
    $scope.failTests = StackViewFactory.getTestWithStatus($scope.stack.tests, "Failing");
    $scope.passTests = StackViewFactory.getTestWithStatus($scope.stack.tests, "Passing");
    $scope.newPercent = StackViewFactory.getPercent($scope.newTests, $scope.stack.tests.length);
    $scope.failPercent = StackViewFactory.getPercent($scope.failTests, $scope.stack.tests.length);
    $scope.passPercent = StackViewFactory.getPercent($scope.passTests, $scope.stack.tests.length);

var data = [],
    zoom = 20, // set zoom size in px
    margin = { // optionally set margins
        top: zoom,
        right: zoom,
        bottom: zoom,
        left: zoom
    },
    // set height and width plus margin so zoomed area is not clipped
    width = 400 - (margin.left + margin.right), // set width in pixels
    height = width - (margin.top + margin.bottom), // height matches width
    // set radius relative to width
    radius = Math.min(
    width - (margin.left + margin.right),
    height - (margin.top + margin.bottom)) / 2,
    // set colors - didnt bother to test this I like blue anyways
    color = d3.scale.ordinal()
        .range(["#ededed", "#cc0000", "#00cc00"]);

// build data array and bind hover events
$.each($.find('[data-chart]'), function (i, el) {
    var obj = {}, $el = $(el);
    $el.addClass($el.data('name'));
    obj['name'] = $el.data('name');
    obj['value'] = $scope[$el.data('chart')];
    data.push(obj);
    $el.on('mouseover', function () {
        d3.select("[id='b-" + i + "']")
            .select("path").transition()
            .duration(300)
            .attr("d", arcOver);
        centerText.text(d3.select("[id='b-" + i + "']").datum().data.name);
    })
        .on("mouseout", function (d) {
        d3.select("[id='b-" + i + "']")
            .select("path").transition()
            .duration(300)
            .attr("d", arc);

        centerText.text($scope.passTests.length + "/" + $scope.stack.tests.length + " passing");
    });
});

// build chart
var chart = d3.select("#donut")
    .append('svg')
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + ((width / 2) + margin.left) + "," + ((height / 2) + margin.top) + ")");

// set radius
var arc = d3.svg.arc()
    .innerRadius(radius / 2)
    .outerRadius(radius);

// set hovered radius
var arcOver = d3.svg.arc()
    .innerRadius(radius / 2)
    .outerRadius(radius + zoom);

var pie = d3.layout.pie()
    .sort(null)
    .startAngle(1.1 * Math.PI)
    .endAngle(3.1 * Math.PI)
    .value(function (d) {
    return d.value;
});

// set chart attributes and bind hover events
var g = chart.selectAll(".arc")
    .data(pie(data))
    .enter()
    .append("g")
    .attr("class", "arc")
    .attr("id", function (d, i) {
    return "b-" + i;
})
    .on("mouseover", function (d) {
    d3.select(this).select("path").transition()
        .duration(300)
        .attr("d", arcOver);
    centerText.text(d3.select(this).datum().data.name);
})
    .on("mouseout", function (d) {
    d3.select(this).select("path").transition()
        .duration(300)
        .attr("d", arc);
    centerText.text($scope.passTests.length + "/" + $scope.stack.tests.length + " passing");
})
    .style("cursor", "pointer")
    .on("click", function () {
    alert(d3.select(this).datum().data.name)
});

// add center text element
var centerText = chart.append("text")
    .attr("dy", ".35em")
    .style("text-anchor", "middle")
    .text($scope.passTests.length + "/" + $scope.stack.tests.length + " passing");


// set fill color and animate tween
g.append("path")
    .style("fill", function (d) {
    return color(d.data.name);
})
    .transition()
    .ease("exp")
    .duration(1000)
    .attrTween("d", tweenPie);

// animate function
function tweenPie(b) {
    var i = d3.interpolate({
        startAngle: 1.1 * Math.PI,
        endAngle: 1.1 * Math.PI
    }, b);
    return function (t) {
        return arc(i(t));
    };
}



});
