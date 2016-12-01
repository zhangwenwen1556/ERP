angular.module('starter.controllers', ['ngCordova', 'ionic-datepicker', 'ionic-timepicker'])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})

.controller('PlaylistsCtrl', function($scope) {
  $scope.playlists = [
    { title: 'Reggae', id: 1 },
    { title: 'Chill', id: 2 },
    { title: 'Dubstep', id: 3 },
    { title: 'Indie', id: 4 },
    { title: 'Rap', id: 5 },
    { title: 'Cowbell', id: 6 }
  ];
})

.controller('PersonHomeCtrl', function($scope) {
  $scope.productlist = [
    { name: '小皮件加工', id: 1, price: 250, image: '/img/product/001.jpg', description: '加工小皮件服务' },
    { name: '大皮件加工', id: 2, price: 150, image: '/img/product/002.jpg', description: '加工大皮件服务' },
    { name: '皮件运输', id: 3, price: 260, image: '/img/product/003.jpg', description: '运输皮件' },
    { name: '运输纸箱小号', id: 4, price: 170, image: '/img/product/004.jpg', description: '用于运输的小号包装纸箱' },
    { name: '运输纸箱中号', id: 5, price: 180, image: '/img/product/005.jpg', description: '用于运输的中号包装纸箱' },
    { name: '运输纸箱大号', id: 6, price: 190, image: '/img/product/006.jpg', description: '用于运输的大号包装纸箱' }
  ];
})

.controller('HomeCtrl', function($scope,$ionicModal,Home,$location,MyOrder,myresources) {
    var salOrderList = MyOrder.getSalOrder();
    var purOrderList = MyOrder.getPurOrder();
    var resourcesList = myresources.getResourcesAll();
    $scope.mainLists = [];
    for(var i=0;i<salOrderList.length;i++){salOrderList[i].type='order';$scope.mainLists.push(salOrderList[i]);}
    for(var i=0;i<purOrderList.length;i++){purOrderList[i].type='order';$scope.mainLists.push(purOrderList[i]);}
    for(var i=0;i<resourcesList.length;i++){resourcesList[i].type='server';$scope.mainLists.push(resourcesList[i]);}

    $ionicModal.fromTemplateUrl('templates/new-task-main.html', function(modal) {
        $scope.taskModal = modal;
    }, {
        scope: $scope
    });

    $scope.newTask = function() {
        $scope.taskModal.show();
    };

    $scope.closeNewTask = function() {
        $scope.taskModal.hide();
    }

    $scope.goInfo = function (id,orderId,type,orderType) {
      if(type == 'order'){
        $location.path('/app/myOrderInfo/'+orderId+"/"+orderType);
      }else if(type == 'server'){
        $location.path('/app/myResourcesInfo/'+id);
      }
    }

})
.controller('FavoritesCtrl', function($scope,Favorites,$location) {
    $scope.favoritesList=Favorites.getAllfavorites();
    $scope.goInfo = function (id,orderId,type,orderType) {
      if(type == '订单'){
        $location.path('/app/myOrderInfo/'+orderId+"/"+orderType);
      }else if(type == '资源'){
        $location.path('/app/myResourcesInfo/'+id);
      }
    }
})

.controller('ContactlistCtrl', function($scope,Contact,$location) {
    $scope.personmainLists = Contact.getAll();
    $scope.goInfo = function (id) {
        $location.path('/app/abouthim/'+id);
    }
})
.controller('UpdatePersonInfo',function ($scope,Contact,$stateParams) {
    var id = $stateParams.personId;
    $scope.personInfo = Contact.get(id);
})
.controller('AboutHim',function ($scope,Contact,$stateParams,$location) {
  var id = $stateParams.personId;
  $scope.personInfo = Contact.get(id);
  $scope.goInfo = function (id) {
    $location.path('/app/editPerson/'+id);
  }
  $scope.goResources = function () {
    $location.path('/app/getResources/');
  }
  $scope.goEvents = function () {
    $location.path('/app/getEvents/');
  }
  $scope.gobusiness = function () {
    $location.path('/app/getBusiness/');
  }
})
.controller('GetResources',function ($scope,myresources,$stateParams,$location) {
  $scope.resourcesListOthers = myresources.getResourcesOthersAll();
  $scope.goInfo = function (resourcesId) {
    $location.path("/app/myResourcesInfo/"+resourcesId);
  }
})
.controller('GetEvent',function ($scope,OtherTime,$stateParams) {
  $scope.timeListOther = OtherTime.getAllOtherTime()
})
.controller('NewGroupChat',function ($scope,GroupChat,$stateParams) {
  $scope.devList = GroupChat.getAll()
})

.controller('PlaylistCtrl', function($scope) {
  $scope.orders = [
    { time: '2016-03-04', id: 'CO10000' },
    { time: '2016-04-08', id: 'CO10001' },
    { time: '2016-07-23', id: 'CO10002' },
    { time: '2016-09-14', id: 'CO10003' },
    { time: '2016-10-09', id: 'CO10004' }
  ];
})
.controller('AboutMe',function ($scope) {
    $scope.myInfo = { id:'1',name:'张文文',img:'img/team/img3-md.jpg',account:'zhangwenwen',sex:'男',address:'上海市松江区泗凯路61弄20号201室',phone:'15072200010'};
})
.controller('EditAddress',function ($scope) {
    $scope.countrys = [
        {id:'China',name:'中国'},
        {id:'America',name:'美国'},
        {id:'Japan',name:'日本'},
        {id:'Russia',name:'俄罗斯'},
        {id:'England',name:'英国'},
        {id:'Canada',name:'加拿大'},
        {id:'Australian',name:'澳大利亚'}
    ];
    $scope.provinces = [
        {id:'zhejiang',name:'浙江'},
        {id:'beijing',name:'北京'},
        {id:'shanghai',name:'上海'},
        {id:'tianjin',name:'天津'},
        {id:'chongqing',name:'重庆'},
    ];
    $scope.citys = [
        {id:'hangzhou',name:'杭州'},
        {id:'ningbo',name:'宁波'},
        {id:'wenzhou',name:'温州'},
        {id:'taizhou',name:'台州'},
        {id:'quzhou',name:'衢州'},
        {id:'jinhua',name:'金华'}
    ];
    $scope.address = '泗凯路61弄20号201室';
    $scope.phone = '0086 15072200010' ;
    $scope.emails = 'zhangwenwen1556@163.com';
})
.controller('myresources',function ($scope,$location,myresources) {
    $scope.resourcesList = myresources.getResourcesAll();
    $scope.selectOption = myresources.getSelectOption();
    $scope.newResources = function(){
        $location.path("/app/newResources");
    }
    $scope.goInfo = function (resourcesId) {
      $location.path("/app/myResourcesInfo/"+resourcesId);
    }
})
.controller('MyResourcesInfo',function ($scope,$stateParams,myresources) {
    var resourcesId = $stateParams.resourcesId;
    $scope.resources = myresources.getResourceInfo(resourcesId);
    $scope.resourcesOther = myresources.getResourceOtherInfo(resourcesId);
})
.controller('NewResources',function ($scope,$cordovaCamera) {
    $scope.imageSrc = "";
    $scope.takePhoto=function(){
        var options = {
            //这些参数可能要配合着使用，比如选择了sourcetype是0，destinationtype要相应的设置
            quality: 100,                                            //相片质量0-100
            destinationType: Camera.DestinationType.FILE_URI,        //返回类型：DATA_URL= 0，返回作为 base64 編碼字串。 FILE_URI=1，返回影像档的 URI。NATIVE_URI=2，返回图像本机URI (例如，資產庫)
            sourceType: Camera.PictureSourceType.CAMERA,             //从哪里选择图片：PHOTOLIBRARY=0，相机拍照=1，SAVEDPHOTOALBUM=2。0和1其实都是本地图库
            allowEdit: false,                                        //在选择之前允许修改截图
            encodingType:Camera.EncodingType.JPEG,                   //保存的图片格式： JPEG = 0, PNG = 1
            targetWidth: 200,                                        //照片宽度
            targetHeight: 200,                                       //照片高度
            mediaType:0,                                             //可选媒体类型：圖片=0，只允许选择图片將返回指定DestinationType的参数。 視頻格式=1，允许选择视频，最终返回 FILE_URI。ALLMEDIA= 2，允许所有媒体类型的选择。
            cameraDirection:0,                                       //枪后摄像头类型：Back= 0,Front-facing = 1
            popoverOptions: CameraPopoverOptions,
            saveToPhotoAlbum: true                                   //保存进手机相册
        };
        $cordovaCamera.getPicture(options).then(function(imageData) {
            //CommonJs.AlertPopup(imageData);
            var image = document.getElementById('myImage');
            image.src=imageData;
            //image.src = "data:image/jpeg;base64," + imageData;
        }, function(err) {
            // error
            //CommonJs.AlertPopup(err.message);
        });
    };
})

.controller('MyOrder',function ($scope,$location, $ionicPopup, MyOrder) {
    $scope.orderList = MyOrder.getSalOrder();
    $scope.getSalOrder = function () {
        $scope.orderList = MyOrder.getSalOrder();
    }
    $scope.getPurOrder = function () {
        $scope.orderList = MyOrder.getPurOrder();
    }
    $scope.goOrderInf = function (orderId,orderTypeId) {
      $location.path('/app/myOrderInfo/'+orderId+'/'+orderTypeId);
    }
    $scope.dateOption = [
        {id:'Three',desc:'过去三天'},
        {id:'Seven',desc:'过去七天'},
        {id:'oneMonth',desc:'过去一个月'},
        {id:'sixMonth',desc:'过去半年'},
        {id:'oneYear',desc:'过去一年'},
        {id:'oneYear',desc:'一年前'},
    ];

    $scope.choiceOrderType = function () {
      $scope.selOrder = 'sal';
      $scope.purOrder = 'pur' ;
      $scope.data = {}
      var orderType = $ionicPopup.show({
        template: '<button class="button" style="width:100%;background-color: wheat;" ng-click="goCreateOrder(purOrder)">采购订单</button><br/>' +
        '<button class="button" style="width: 100%;background-color: wheat;margin-top: 2px;" ng-click="goCreateOrder(selOrder)">销售订单</button><br/>' +
        '<button class="button" style="width: 100%;background-color: red;margin-top: 2px;" ng-click="closeChoiceOrderType();">关闭</button>',
        title: '请选择需要创建的订单类型',
        scope: $scope

      });
      orderType.then(function(res) {
        console.log('Tapped!', res);
      });
      $scope.orderType = orderType;
    }
    $scope.closeChoiceOrderType = function () {
      $scope.orderType.close();
    }
    $scope.goCreateOrder = function (type) {
      //alert(types);
      $scope.orderType.close();
      $location.path('/app/createOrder/'+type);
    }

})
.controller('MyOrderInfo', function ($scope,$stateParams,$ionicModal,$ionicPopup,MyOrder,Contact,ChatList,MyOrderInfo) {
    var orderId = $stateParams.orderId;
    var orderTypeId = $stateParams.orderTypeId;
    $scope.personList = Contact.getAll();
    $scope.ChatList = ChatList.getChatList();
    $scope.itemList = MyOrderInfo.getInfo(orderId);
    $scope.orderId = orderId;

    if(orderTypeId == 'sal'){
      $scope.orderInfo = MyOrder.getSalOrderInfo(orderId);

    }else if(orderTypeId == 'pur') {
      $scope.orderInfo = MyOrder.getPurOrderInfo(orderId);

    }

    $ionicModal.fromTemplateUrl('templates/showOrderShowPerson.html', function(modal) {
      $scope.person = modal;
    }, {
      scope: $scope
    });
    $ionicModal.fromTemplateUrl('templates/orderChat.html', function(modal) {
      $scope.orderChat = modal;
    }, {
      scope: $scope
    });

    $scope.showPerson = function () {
      $scope.person.show();
    }
    $scope.hiddenPerson = function () {
      $scope.person.hide();
    }
    $scope.showOrderChat = function () {
      $scope.orderChat.show();
    }
    $scope.hiddenOrderChat = function () {
      $scope.orderChat.hide();
    }

    $scope.statusPopup = null;
    //订单状态弹出
    $scope.showStatusPopup = function() {
      $scope.cancelledOrder = '取消订单';
      $scope.completedOrder = '完成订单' ;
      $scope.data = {}
      var myPopup = $ionicPopup.show({
        template: '<button class="button" style="width:100%;background-color: wheat;" ng-click="updateOrderStatus(cancelledOrder)">取消订单</button><br/>' +
        '<button class="button" style="width: 100%;background-color: wheat;margin-top: 2px;" ng-click="updateOrderStatus(completedOrder)">完成订单</button><br/>' +
        '<button class="button" style="width: 100%;background-color: red;margin-top: 2px;" ng-click="closeStatusPopup();">关闭</button>',
        title: '请选择需要更改的订单状态',
        scope: $scope

      });
      myPopup.then(function(res) {
        console.log('Tapped!', res);
      });
      $scope.statusPopup = myPopup;
    };
    $scope.closeStatusPopup = function () {
      $scope.statusPopup.close();
    }
    $scope.updateOrderStatus = function (statusName) {
      MyOrder.updateOrderStatus($scope.orderId,statusName);
      $scope.statusPopup.close();
    }
  //订单调整添加
  $scope.orderAdjustment = function() {
    $scope.data = {}
    // 自定义弹窗
    var Adjustment = $ionicPopup.show({
      template: '<input type="number" placeholder="调整金额" ng-model="data.adjustmentPrice">' +
      '<input style="margin-top: 6px;" type="text" placeholder="调整原因" ng-model="data.adjustmentReason">',
      title: '订单调整',
      subTitle: '输入框都为必填',
      scope: $scope,
      buttons: [
        { text: '取消' },
        {
          text: '<b>添加</b>',
          type: 'button-positive',
          onTap: function(e) {
            if (!$scope.data.adjustmentPrice || !$scope.data.adjustmentReason) {
              e.preventDefault();
            } else {
              MyOrder.addAdjustment(orderId,$scope.data.adjustmentPrice,$scope.data.adjustmentReason,'zhangwenwen')
              return $scope.data.adjustmentPrice;
            }
          }
        },
      ]
    });
    Adjustment.then(function(res) {
      console.log('Tapped!', res);
    });
  };
})
.controller('CreateOrder',function ($scope,$stateParams,$ionicModal,$ionicPopup,CreateOrder,Contact,myresources) {
  var typeId = $stateParams.typeId;
  $scope.contactList = Contact.getAll();
  $scope.resourcesList = myresources.getResourcesAll();
  $scope.typeId = typeId;
  if(typeId == 'sal'){
    $scope.pageTitle = '销售订单录入' ;
    $scope.orderInfo = CreateOrder.getSalOrderInfo();
  }else if(typeId == 'pur'){
    $scope.pageTitle = '采购订单录入' ;
    $scope.orderInfo = CreateOrder.getPurOrderInfo();
  }

  $ionicModal.fromTemplateUrl('templates/orderContact.html', function(modal) {
    $scope.contact = modal;
  }, {
    scope: $scope
  });

  $ionicModal.fromTemplateUrl('templates/addResourcesToOrder.html', function(modal) {
    $scope.resources = modal;
  }, {
    scope: $scope
  });

  $scope.addressConfirm = null;
  //我的地址是否应用到订单状态弹出
  $scope.showAddressConfirm = function(partyId) {
    $scope.partyId = partyId;
    $scope.used = 'Y';
    $scope.notUsed = 'N' ;
    $scope.data = {}
    var myPopup = $ionicPopup.show({
      template: '<button class="button" style="width:100%;background-color: wheat;" ng-click="addAddressToOrder(used)">应用</button><br/>' +
      '<button class="button" style="width: 100%;background-color: wheat;margin-top: 2px;" ng-click="addAddressToOrder(notUsed)">不应用</button><br/>' +
      '<button class="button" style="width: 100%;background-color: red;margin-top: 2px;" ng-click="closeAddressConfim();">关闭</button>',
      title: '自己的联系地址是否应用到订单',
      scope: $scope

    });
    myPopup.then(function(res) {
      console.log('Tapped!', res);
    });
    $scope.addressConfirm = myPopup;
  };

  $scope.showContact = function () {
    $scope.contact.show();
  }
  $scope.hiddenContact = function () {
    $scope.contact.hide();
  }
  $scope.showResources = function () {
    $scope.resources.show();
  }
  $scope.hiddenResources = function () {
    $scope.resources.hide();
  }

  $scope.closeAddressConfim = function () {
    $scope.addressConfirm.close();
  }
  $scope.addAddressToOrder = function (flag) {
    var contect = Contact.get($scope.partyId);
    if(typeId=='sal'){
      CreateOrder.setPartyToSalOrder(contect.id,contect.name,contect.phone);
      if(flag=='Y'){
        CreateOrder.setAddressToSalOrder(contect.address);
      }else{
        CreateOrder.setAddressToSalOrder("");
      }
    }else if(typeId == 'pur'){
      CreateOrder.setPartyToPurOrder(contect.id,contect.name,contect.phone);
      if(flag=='Y'){
        CreateOrder.setAddressToPurOrder(contect.address);
      }else{
        CreateOrder.setAddressToPurOrder("");
      }
    }
    $scope.addressConfirm.close();
    $scope.contact.hide();
  }
  $scope.addResourcesToOrder = function (resources) {
    if(typeId == 'sal'){
      CreateOrder.setSalResources(resources);
    }else if(typeId == 'pur'){
      CreateOrder.setPurResources(resources);
    }
    $scope.resources.hide();
  }
  $scope.removeResourcesToOrder = function (resources) {
    if(typeId == 'sal'){
      CreateOrder.removeResourcesToSalOrder(resources);
    }else if(typeId == 'pur'){
      CreateOrder.removeResourcesToPurOrder(resources);
    }
  }

  // $scope.orderInfo.partyId = '100020';
  // $scope.orderInfo.partyName = '张文文';
})
.controller('ChatList',function ($scope,$location,ChatList) {
    $scope.ChatList = ChatList.getChatList();
    $scope.goInfo = function (id) {
      $location.path('/app/chatInfo/'+id);
    }
})
.controller('ChatInfo',function ($scope, $stateParams, $location, ChatList) {
    $scope.rightMenu = 'chat';
    $scope.userId = 'PERS_10008';
    var chatId = $stateParams.chatId;
    $scope.chat = ChatList.getChatInfo(chatId);
    $scope.person = ChatList.getPersonInfo($scope.userId);
    $scope.goPersonList = function (id) {
      $location.path("/app/chatPersonList/"+id);
    }

})
.controller('ChatPersonList',function ($scope, $stateParams,ChatList) {
    $scope.chat = ChatList.getChatInfo($stateParams.chatId);
})
.controller('PersonLabel', function ($scope, $location, PersonLabel) {
    $scope.labelList = PersonLabel.getAllLabl();
    $scope.goLabelInPerson = function (labelId) {
      $location.path('/app/labelPersonList/'+labelId);
    }
})
.controller('LabelPersonList',function ($scope, $stateParams, $ionicModal, Contact, PersonLabel) {
    $scope.labelId = $stateParams.labelId;
    $scope.personList = Contact.getPersonLabel($scope.labelId);
    $scope.labelInfo = PersonLabel.getInfo($scope.labelId);
    $scope.personNoinLabel = Contact.getPersonNoinLabel($scope.labelId);
})
.controller('MyTime',function ($scope,MyTime,$location) {
    $scope.myTimes = MyTime.getAllMyTime();
    //$scope.lists = $filter('orderBy')($scope.myTimes, expression, reverse)
    $scope.goInfo = function (timeId,infoId) {
      $location.path('/app/tiemInfo/'+timeId+'/'+infoId);
    }

})
.controller('TiemInfo',function ($scope, $stateParams, MyTime, ionicDatePicker, ionicTimePicker) {
    var timeId = $stateParams.timeId;
    var infoId = $stateParams.infoId;
    $scope.time = MyTime.getTimeInfo(timeId,infoId);

    $scope.date = $scope.time.biginTime;

    $scope.beginTime = $scope.time.biginTime;
    $scope.endTime = $scope.time.endTime;

    var today=new Date();
    var fromYear= today.getYear()+1900;
    var toYear= today.getYear()+1901;
    var intMonth=today.getMonth();
    var intDay=today.getDate();

    var ipObj1 = {
        callback: function (val) {  //Mandatory
            $scope.date = new Date(val);
            //console.log('Return value from the datepicker popup is : ' + date, new Date(val));
        },
        disabledDates: [            //Optional
            new Date(2016, 2, 16),
            new Date(2015, 3, 16),
            new Date(2015, 4, 16),
            new Date(2015, 5, 16),
            new Date('Wednesday, August 12, 2015'),
            new Date("08-16-2016"),
            new Date(1439676000000)
        ],
        from: new Date(fromYear, intMonth, intDay), //Optional
        to: new Date(toYear, intMonth, intDay), //Optional
        inputDate: new Date(),      //Optional
        mondayFirst: true,          //Optional
        //disableWeekdays: [0],       //Optional  这里是选择是否将周六周末不可选
        closeOnSelect: false,       //Optional
        templateType: 'popup'       //Optional
    };

    $scope.openDatePicker = function(){
        ionicDatePicker.openDatePicker(ipObj1);
    };

    var optionId = '';
    var ipObj2 = {
        callback: function (val) {      //Mandatory
            if (typeof (val) === 'undefined') {
                console.log('Time not selected');
            } else {
              var selectedTime = new Date(val * 1000);
                if(optionId == 'beginTime'){
                  $scope.beginTime = (selectedTime.getUTCHours()+':'+selectedTime.getUTCMinutes()+':00');
                }else{
                  $scope.endTime = (selectedTime.getUTCHours()+':'+selectedTime.getUTCMinutes()+':00');
                }
                // var selectedTime = new Date(val * 1000);
                // document.getElementById(optionId).value = selectedTime.getUTCHours()+':'+selectedTime.getUTCMinutes()+':00';
                // document.getElementById(optionId+"Div").html = selectedTime.getUTCHours()+':'+selectedTime.getUTCMinutes()+':00';
                // console.log('Selected epoch is : ', val, 'and the time is ', selectedTime.getUTCHours(), 'H :', selectedTime.getUTCMinutes(), 'M');
            }
        },
        inputTime: 50400,   //Optional
        format: 12,         //Optional
        step: 15,           //Optional
        setLabel: '选择'    //Optional
    };
    $scope.getIime = function (val) {
        optionId = val ;
        ionicTimePicker.openTimePicker(ipObj2);
    }


})
;
