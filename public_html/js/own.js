var app = angular.module("humbak", ['ngCookies']);
app.controller("sport.controller", ['$scope', '$location', '$cookies', '$timeout',
    function ($scope, $location, $cookies, $timeout) {

        $scope.sportmodel = {};

        $scope.doneLoading = false;

        $scope.showall = true;

        var tempcookie = $cookies.get('apiserverurl');

        if (tempcookie) {
            $scope.sportmodel.baseurl = tempcookie;
        } else {
            $scope.sportmodel.baseurl = '';
        }

        $scope.loadEnded = function () {
            $scope.doneLoading = true;
            $scope.showall = true;
            $scope.$apply();
        };

        $scope.sportmodel.absUrl = $location.absUrl();

        $scope.sportmodel.currentlist = {};

        $scope.currPartUrl = {};


        if ($scope.sportmodel.absUrl.indexOf('sport_') !== -1) {
            // Sport
            $scope.currPartUrl.base = '/sport/rest/sport/';


            //save only
            if ($scope.sportmodel.absUrl.indexOf('felvitel') !== -1) {
                $scope.initializenewEntity = function () {
                    $scope.doneLoading = false;
                    $scope.sportmodel.newEntity = {};

                    $scope.sportmodel.newEntity.name = '';
                    $scope.sportmodel.newEntity.description = '';

                    //$timeout($scope.loadEnded());
                    $scope.doneLoading = true;
                };

                $scope.currPartUrl.savenave = 'save';

                $scope.jsonForSave = function () {
                    return JSON.stringify({
                        name: $scope.sportmodel.newEntity.name,
                        description: $scope.sportmodel.newEntity.description
                    });
                };
            }

        } else if ($scope.sportmodel.absUrl.indexOf('szezon_') !== -1) {
            // Szezon Season
            $scope.currPartUrl.base = '/sport/rest/season/';

            //save only
            if ($scope.sportmodel.absUrl.indexOf('felvitel') !== -1) {
                $scope.initializenewEntity = function () {
                    $scope.doneLoading = false;
                    $scope.sportmodel.newEntity = {};

                    $scope.sportmodel.newEntity.name = '';
                    $scope.sportmodel.newEntity.description = '';

                    //$timeout($scope.loadEnded());
                    $scope.doneLoading = true;
                };

                $scope.currPartUrl.savenave = 'save';

                $scope.jsonForSave = function () {
                    return JSON.stringify({
                        name: $scope.sportmodel.newEntity.name,
                        description: $scope.sportmodel.newEntity.description
                    });
                };
            }

        } else if ($scope.sportmodel.absUrl.indexOf('sorozat_') !== -1) {
            // Sorozat Seria
            $scope.currPartUrl.base = '/sport/rest/seria/';

            //save only
            if ($scope.sportmodel.absUrl.indexOf('felvitel') !== -1) {
                $scope.initializenewEntity = function () {
                    $scope.doneLoading = false;
                    $scope.sportmodel.newEntity = {};

                    $scope.sportmodel.newEntity.name = '';
                    $scope.sportmodel.newEntity.description = '';

                    //$timeout($scope.loadEnded());
                    $scope.doneLoading = true;
                };

                $scope.currPartUrl.savenave = 'save';

                $scope.jsonForSave = function () {
                    return JSON.stringify({
                        name: $scope.sportmodel.newEntity.name,
                        description: $scope.sportmodel.newEntity.description
                    });
                };
            }

        } else if ($scope.sportmodel.absUrl.indexOf('kontipus_') !== -1) {
            // Kondíciótípus ConditionType
            $scope.currPartUrl.base = '/sport/rest/conditiontype/';

            //save only
            if ($scope.sportmodel.absUrl.indexOf('felvitel') !== -1) {
                $scope.initializenewEntity = function () {
                    $scope.doneLoading = false;
                    $scope.sportmodel.newEntity = {};

                    $scope.sportmodel.newEntity.name = '';
                    $scope.sportmodel.newEntity.description = '';

                    //$timeout($scope.loadEnded());
                    $scope.doneLoading = true;
                };

                $scope.currPartUrl.savenave = 'save';

                $scope.jsonForSave = function () {
                    return JSON.stringify({
                        name: $scope.sportmodel.newEntity.name,
                        description: $scope.sportmodel.newEntity.description
                    });
                };
            }

        } else if ($scope.sportmodel.absUrl.indexOf('jelentkezes') !== -1) {
            // Jelentkezés application
            //Csak mentés
            $scope.currPartUrl.base = '/sport/rest/entry/';

            $scope.initializenewEntity = function () {
                $scope.doneLoading = false;
                $scope.sportmodel.newEntity = {};

                $scope.sportmodel.newEntity.id = -1;
                $scope.sportmodel.newEntity.name = '';

                //$timeout($scope.loadEnded());
                $scope.doneLoading = true;
            };

            $scope.currPartUrl.savenave = 'save';

            $scope.jsonForSave = function () {
                return JSON.stringify({
                    id: $scope.sportmodel.newEntity.id,
                    name: $scope.sportmodel.newEntity.name
                });
            };

        } else if ($scope.sportmodel.absUrl.indexOf('special_') !== -1) {
            //Specializáció Specialization
            //Csak mentés
            $scope.currPartUrl.base = '/sport/rest/sportspecialization/';

            $scope.initializenewEntity = function () {
                $scope.doneLoading = false;
                $scope.sportmodel.newEntity = {};

                $scope.sportmodel.newEntity.name = '';
                $scope.sportmodel.newEntity.description = '';
                $scope.sportmodel.newEntity.parendid = -1;

                //$timeout($scope.loadEnded());
                $scope.doneLoading = true;
            };

            $scope.currPartUrl.savenave = 'save';

            $scope.jsonForSave = function () {
                return JSON.stringify({
                    name: $scope.sportmodel.newEntity.name,
                    description: $scope.sportmodel.newEntity.description,
                    parendid: $scope.sportmodel.newEntity.parendid
                });
            };

            //Lista a választáshoz
            $scope.sportmodel.Sports = [];

            $scope.getSports = function () {
                if ($scope.sportmodel.baseurl) {
                    $scope.doneLoading = false;
                    $.ajax({
                        url: $scope.sportmodel.baseurl + '/sport/rest/sport/idname/all',
                        type: 'GET',
                        async: true,
                        contentType: 'application/json',
                        error: function (error) {
                            alert(error.statusText);
                            $timeout($scope.loadEnded());
                        },
                        success: function (result) {
                            $scope.sportmodel.Sports = result;
                            $timeout($scope.loadEnded());
                        }
                    });
                } else {
                    alert('Nincs megadva a szerver elérésiútja');

                    $scope.showall = false;
                }
            };

            $scope.getSports();

        } else if ($scope.sportmodel.absUrl.indexOf('kondicio_') !== -1) {
            // Kondíció Condition
            $scope.currPartUrl.base = '/sport/rest/condition/';

            //save only
            if ($scope.sportmodel.absUrl.indexOf('felvitel') !== -1) {
                $scope.initializenewEntity = function () {
                    $scope.doneLoading = false;
                    $scope.sportmodel.newEntity = {};

                    $scope.sportmodel.newEntity.sportid = -1;
                    $scope.sportmodel.newEntity.typeid = -1;

                    $scope.sportmodel.newEntity.minimum = '';
                    $scope.sportmodel.newEntity.equal = '';
                    $scope.sportmodel.newEntity.maximum = '';

                    $scope.sportmodel.newEntity.name = '';
                    $scope.sportmodel.newEntity.description = '';

                    //$timeout($scope.loadEnded());
                    $scope.doneLoading = true;
                };

                $scope.currPartUrl.savenave = 'save';

                $scope.jsonForSave = function () {
                    return JSON.stringify({
                        name: $scope.sportmodel.newEntity.name,
                        description: $scope.sportmodel.newEntity.description,
                        sportid: $scope.sportmodel.newEntity.sportid,
                        typeid: $scope.sportmodel.newEntity.typeid,
                        minimum: $scope.sportmodel.newEntity.minimum,
                        equal: $scope.sportmodel.newEntity.equal,
                        maximum: $scope.sportmodel.newEntity.maximum
                    });
                };

                //Listák a választáshoz
                $scope.sportmodel.Sports = [];

                //$scope.sportmodel.newEntity.sportid = -1;

                $scope.getSports = function () {
                    if ($scope.sportmodel.baseurl) {
                        $scope.doneLoading = false;
                        $.ajax({
                            url: $scope.sportmodel.baseurl + '/sport/rest/sport/idname/all',
                            type: 'GET',
                            async: true,
                            contentType: 'application/json',
                            error: function (error) {
                                alert(error.statusText);
                                $timeout($scope.loadEnded());
                            },
                            success: function (result) {
                                $scope.sportmodel.Sports = result;
                                $timeout($scope.loadEnded());
                            }
                        });
                    } else {
                        alert('Nincs megadva a szerver elérésiútja');

                        $scope.showall = false;
                    }
                };

                $scope.getSports();
            }

        } else if ($scope.sportmodel.absUrl.indexOf('fordulo_') !== -1) {
            // Verseny/Forduló Round (Hozzáadás)
            $scope.currPartUrl.base = '/sport/rest/championship/';

            $scope.initializenewEntity = function () {
                $scope.doneLoading = false;
                $scope.sportmodel.newEntity = {};

                $scope.sportmodel.newEntity.name = '';
                $scope.sportmodel.newEntity.description = '';

                $scope.sportmodel.newEntity.eventid = -1;

                //$timeout($scope.loadEnded());
                $scope.doneLoading = true;
            };

            $scope.currPartUrl.savenave = 'addround';

            $scope.jsonForSave = function () {
                return JSON.stringify({
                    name: $scope.sportmodel.newEntity.name,
                    description: $scope.sportmodel.newEntity.description,
                    eventid: $scope.sportmodel.newEntity.eventid
                });
            };

            //Listák a választáshoz
            $scope.sportmodel.Championships = [];
            $scope.sportmodel.Events = [];

            $scope.sportmodel.selectedChampionshipId = -1;


            $scope.getChampionships = function () {
                if ($scope.sportmodel.baseurl) {
                    $scope.doneLoading = false;
                    $.ajax({
                        url: $scope.sportmodel.baseurl + '/sport/rest/championship/idname/all',
                        type: 'GET',
                        async: true,
                        contentType: 'application/json',
                        error: function (error) {
                            alert(error.statusText);
                            $timeout($scope.loadEnded());
                        },
                        success: function (result) {
                            $scope.sportmodel.Championships = result;
                            $timeout($scope.loadEnded());
                        }
                    });
                } else {
                    alert('Nincs megadva a szerver elérésiútja');

                    $scope.showall = false;
                }
            };
            $scope.getEvents = function () {
                if ($scope.sportmodel.baseurl) {
                    $scope.doneLoading = false;
                    $.ajax({
                        url: $scope.sportmodel.baseurl + '/sport/rest/championship/events/idname/' + $scope.sportmodel.selectedChampionshipId,
                        type: 'GET',
                        async: true,
                        contentType: 'application/json',
                        error: function (error) {
                            alert(error.statusText);
                            $timeout($scope.loadEnded());
                        },
                        success: function (result) {
                            $scope.sportmodel.Events = result;
                            $timeout($scope.loadEnded());
                        }
                    });
                } else {
                    alert('Nincs megadva a szerver elérésiútja');

                    $scope.showall = false;
                }
            };

            $scope.getChampionships();



            //Eventek csak a championship kiválasztása után jönnek le


            //Futamot nem lehet hozzáadni
            //} else if ($scope.sportmodel.absUrl.indexOf('futam_') !== -1) {
            //    // Futam/Mérkőzés Race
            //    $scope.currPartUrl.base = '/sport/rest/xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx/';
            //    $scope.jsonForSave = function () {
            //        return JSON.stringify({
            //            name: $scope.sportmodel.newEntity.name,
            //            description: $scope.sportmodel.newEntity.description
            //        });
            //    }

        } else if ($scope.sportmodel.absUrl.indexOf('event_') !== -1) {
            // Sport/Event (Hozzáadás)
            $scope.currPartUrl.base = '/sport/rest/championship/';

            $scope.initializenewEntity = function () {
                $scope.doneLoading = false;
                $scope.sportmodel.newEntity = {};

                $scope.sportmodel.newEntity.championshipid = -1;
                $scope.sportmodel.newEntity.sportid = -1;

                $scope.sportmodel.newEntity.specializationidlist = [];
                $scope.sportmodel.newEntity.conditionidlist = [];

                $scope.sportmodel.newEntity.conditionentitylist = [];
                $scope.sportmodel.newEntity.specializationentitylist = [];

                //$timeout($scope.loadEnded());
                $scope.doneLoading = true;
            };

            $scope.currPartUrl.savenave = 'addsport';

            $scope.jsonForSave = function () {
                return JSON.stringify({
                    championshipid: $scope.sportmodel.newEntity.championshipid,
                    sportid: $scope.sportmodel.newEntity.sportid,
                    specializationid: $scope.sportmodel.newEntity.specializationidlist,
                    conditionid: $scope.sportmodel.newEntity.conditionidlist
                });
            };

            //Listák a választáshoz
            $scope.sportmodel.Championships = [];
            $scope.sportmodel.Sports = [];
            $scope.sportmodel.ConditionTypes = [];

            $scope.sportmodel.SportSpecs = [];
            $scope.sportmodel.Conditions = [];

            $scope.sportmodel.selectedCTypeId = -1;
            //$scope.sportmodel.selectedSportTypeId = -1;

            $scope.sportmodel.selectedSpecializationId = -1;
            $scope.sportmodel.selectedContitionId = -1;


            $scope.getChampionships = function () {
                if ($scope.sportmodel.baseurl) {
                    $scope.doneLoading = false;
                    $.ajax({
                        url: $scope.sportmodel.baseurl + '/sport/rest/championship/idname/all',
                        type: 'GET',
                        async: true,
                        contentType: 'application/json',
                        error: function (error) {
                            alert(error.statusText);
                            $timeout($scope.loadEnded());
                        },
                        success: function (result) {
                            $scope.sportmodel.Championships = result;
                            $timeout($scope.loadEnded());
                        }
                    });
                } else {
                    alert('Nincs megadva a szerver elérésiútja');

                    $scope.showall = false;
                }
            };
            $scope.getSports = function () {
                if ($scope.sportmodel.baseurl) {
                    $scope.doneLoading = false;
                    $.ajax({
                        url: $scope.sportmodel.baseurl + '/sport/rest/sport/idname/all',
                        type: 'GET',
                        async: true,
                        contentType: 'application/json',
                        error: function (error) {
                            alert(error.statusText);
                            $timeout($scope.loadEnded());
                        },
                        success: function (result) {
                            $scope.sportmodel.Sports = result;
                            $timeout($scope.loadEnded());
                        }
                    });
                } else {
                    alert('Nincs megadva a szerver elérésiútja');

                    $scope.showall = false;
                }
            };
            $scope.getConditionTypes = function () {
                if ($scope.sportmodel.baseurl) {
                    $scope.doneLoading = false;
                    $.ajax({
                        url: $scope.sportmodel.baseurl + '/sport/rest/conditiontype/idname/all',
                        type: 'GET',
                        async: true,
                        contentType: 'application/json',
                        error: function (error) {
                            alert(error.statusText);
                            $timeout($scope.loadEnded());
                        },
                        success: function (result) {
                            $scope.sportmodel.ConditionTypes = result;
                            $timeout($scope.loadEnded());
                        }
                    });
                } else {
                    alert('Nincs megadva a szerver elérésiútja');

                    $scope.showall = false;
                }
            };

            $scope.getSportSpecs = function () {
                if ($scope.sportmodel.baseurl) {
                    $scope.doneLoading = false;
                    $.ajax({
                        url: $scope.sportmodel.baseurl + '/sport/rest/sportspecialization/idname/' + $scope.sportmodel.newEntity.sportid,
                        type: 'GET',
                        async: true,
                        contentType: 'application/json',
                        error: function (error) {
                            alert(error.statusText);
                            $timeout($scope.loadEnded());
                        },
                        success: function (result) {
                            $scope.sportmodel.SportSpecs = result;
                            $timeout($scope.loadEnded());
                        }
                    });
                } else {
                    alert('Nincs megadva a szerver elérésiútja');

                    $scope.showall = false;
                }
            };
            $scope.getConditions = function () {
                if ($scope.sportmodel.baseurl) {
                    $scope.doneLoading = false;
                    $.ajax({
                        url: $scope.sportmodel.baseurl + '/sport/rest/condition/idname/all/' + $scope.sportmodel.selectedCTypeId,
                        type: 'GET',
                        async: true,
                        contentType: 'application/json',
                        error: function (error) {
                            alert(error.statusText);
                            $timeout($scope.loadEnded());
                        },
                        success: function (result) {
                            $scope.sportmodel.Conditions = result;
                            $timeout($scope.loadEnded());
                        }
                    });
                } else {
                    alert('Nincs megadva a szerver elérésiútja');

                    $scope.showall = false;
                }
            };

            $scope.AddToSpecializations = function () {
                $scope.sportmodel.newEntity.specializationidlist.push($scope.sportmodel.selectedSpecializationId);
            };
            $scope.AddToConditions = function () {
                $scope.sportmodel.newEntity.conditionidlist.push($scope.sportmodel.selectedContitionId);
            };

            $scope.getChampionships();
            $scope.getSports();
            $scope.getConditionTypes();

            $scope.getCondId = function (element) {
                return element.id === $scope.sportmodel.selectedContitionId;
            };
            $scope.addConditionToList = function () {
                $scope.sportmodel.newEntity.conditionidlist.push($scope.sportmodel.selectedContitionId);
                $scope.sportmodel.newEntity.conditionentitylist.push($scope.sportmodel.Conditions.find($scope.getCondId));
            };
            $scope.removeConditionFromList = function (inid) {
                var index = $scope.sportmodel.newEntity.conditionidlist.indexOf(inid);

                if (index > -1) {
                    $scope.sportmodel.newEntity.conditionidlist.splice(index, 1);
                    $scope.sportmodel.newEntity.conditionentitylist.splice(index, 1);
                }
            };

            $scope.getSpecId = function (element) {
                return element.id === $scope.sportmodel.selectedSpecializationId;
            };
            $scope.addSpecializationToList = function () {
                $scope.sportmodel.newEntity.specializationidlist.push($scope.sportmodel.selectedSpecializationId);
                $scope.sportmodel.newEntity.specializationentitylist.push($scope.sportmodel.SportSpecs.find($scope.getSpecId));
            };
            $scope.removeSpecializationFromList = function (inid) {
                var index = $scope.sportmodel.newEntity.specializationidlist.indexOf(inid);

                if (index > -1) {
                    $scope.sportmodel.newEntity.specializationidlist.splice(index, 1);
                    $scope.sportmodel.newEntity.specializationentitylist.splice(index, 1);
                }
            };

            //Kondíció csak kondtípus után és Spec csak sport után választható

        } else if ($scope.sportmodel.absUrl.indexOf('bajnoksag_') !== -1) {
            // Bajnokság Championship
            $scope.currPartUrl.base = '/sport/rest/championship/';

            //save only
            if ($scope.sportmodel.absUrl.indexOf('felvitel') !== -1) {
                $scope.initializenewEntity = function () {
                    $scope.doneLoading = false;
                    $scope.sportmodel.newEntity = {};

                    $scope.sportmodel.newEntity.name = '';
                    $scope.sportmodel.newEntity.description = '';

                    $scope.sportmodel.newEntity.startDate = '';
                    $scope.sportmodel.newEntity.endDate = '';

                    $scope.sportmodel.newEntity.seasonid = -1;
                    $scope.sportmodel.newEntity.seriaid = -1;
                    $scope.sportmodel.newEntity.conditionidlist = [];

                    $scope.sportmodel.newEntity.conditionentitylist = [];

                    //$timeout($scope.loadEnded());
                    $scope.doneLoading = true;
                };

                $scope.currPartUrl.savenave = 'save';

                $scope.jsonForSave = function () {
                    return JSON.stringify({
                        name: $scope.sportmodel.newEntity.name,
                        description: $scope.sportmodel.newEntity.description,
                        startDate: $scope.sportmodel.newEntity.startDate,
                        endDate: $scope.sportmodel.newEntity.endDate,
                        seasonid: $scope.sportmodel.newEntity.seasonid,
                        seriaid: $scope.sportmodel.newEntity.seriaid,
                        conditionid: $scope.sportmodel.newEntity.conditionidlist
                    });
                };

                //Listák a választáshoz
                $scope.sportmodel.Sports = [];
                $scope.sportmodel.ConditionTypes = [];
                $scope.sportmodel.Seasons = [];
                $scope.sportmodel.Series = [];

                $scope.sportmodel.Conditions = [];

                $scope.sportmodel.selectedCTypeId = -1;

                $scope.sportmodel.selectedContitionId = -1;


                $scope.getSports = function () {
                    if ($scope.sportmodel.baseurl) {
                        $scope.doneLoading = false;
                        $.ajax({
                            url: $scope.sportmodel.baseurl + '/sport/rest/sport/idname/all',
                            type: 'GET',
                            async: true,
                            contentType: 'application/json',
                            error: function (error) {
                                alert(error.statusText);
                                $timeout($scope.loadEnded());
                            },
                            success: function (result) {
                                $scope.sportmodel.Sports = result;
                                $timeout($scope.loadEnded());
                            }
                        });
                    } else {
                        alert('Nincs megadva a szerver elérésiútja');

                        $scope.showall = false;
                    }
                };
                $scope.getConditionTypes = function () {
                    if ($scope.sportmodel.baseurl) {
                        $scope.doneLoading = false;
                        $.ajax({
                            url: $scope.sportmodel.baseurl + '/sport/rest/conditiontype/idname/all',
                            type: 'GET',
                            async: true,
                            contentType: 'application/json',
                            error: function (error) {
                                alert(error.statusText);
                                $timeout($scope.loadEnded());
                            },
                            success: function (result) {
                                $scope.sportmodel.ConditionTypes = result;

                                $timeout($scope.loadEnded());
                            }
                        });
                    } else {
                        alert('Nincs megadva a szerver elérésiútja');

                        $scope.showall = false;
                    }
                };
                $scope.getSeasons = function () {
                    if ($scope.sportmodel.baseurl) {
                        $scope.doneLoading = false;
                        $.ajax({
                            url: $scope.sportmodel.baseurl + '/sport/rest/season/idname/all',
                            type: 'GET',
                            async: true,
                            contentType: 'application/json',
                            error: function (error) {
                                alert(error.statusText);
                                $timeout($scope.loadEnded());
                            },
                            success: function (result) {
                                $scope.sportmodel.Seasons = result;
                                $timeout($scope.loadEnded());
                            }
                        });
                    } else {
                        alert('Nincs megadva a szerver elérésiútja');

                        $scope.showall = false;
                    }
                };
                $scope.getSeries = function () {
                    if ($scope.sportmodel.baseurl) {
                        $scope.doneLoading = false;
                        $.ajax({
                            url: $scope.sportmodel.baseurl + '/sport/rest/seria/idname/all',
                            type: 'GET',
                            async: true,
                            contentType: 'application/json',
                            error: function (error) {
                                alert(error.statusText);
                                $timeout($scope.loadEnded());
                            },
                            success: function (result) {
                                $scope.sportmodel.Series = result;
                                $timeout($scope.loadEnded());
                            }
                        });
                    } else {
                        alert('Nincs megadva a szerver elérésiútja');

                        $scope.showall = false;
                    }
                };


                $scope.getConditions = function () {
                    if ($scope.sportmodel.baseurl) {
                        $scope.doneLoading = false;
                        $.ajax({
                            url: $scope.sportmodel.baseurl + '/sport/rest/condition/idname/all/' + $scope.sportmodel.selectedCTypeId,
                            type: 'GET',
                            async: true,
                            contentType: 'application/json',
                            error: function (error) {
                                alert(error.statusText);
                                $timeout($scope.loadEnded());
                            },
                            success: function (result) {
                                $scope.sportmodel.Conditions = result;
                                $timeout($scope.loadEnded());
                            }
                        });
                    } else {
                        alert('Nincs megadva a szerver elérésiútja');

                        $scope.showall = false;
                    }
                };

                $scope.AddToConditions = function () {
                    $scope.sportmodel.newEntity.conditionidlist.push($scope.sportmodel.selectedContitionId);
                };


                $scope.getSports();
                $scope.getConditionTypes();
                $scope.getSeasons();
                $scope.getSeries();

                $scope.getId = function (element) {
                    return element.id === $scope.sportmodel.selectedContitionId;
                };

                $scope.addConditionToList = function () {
                    $scope.sportmodel.newEntity.conditionidlist.push($scope.sportmodel.selectedContitionId);
                    $scope.sportmodel.newEntity.conditionentitylist.push($scope.sportmodel.Conditions.find($scope.getId));
                };

                $scope.removeConditionFromList = function (inid) {
                    var index = $scope.sportmodel.newEntity.conditionidlist.indexOf(inid);

                    if (index > -1) {
                        $scope.sportmodel.newEntity.conditionidlist.splice(index, 1);
                        $scope.sportmodel.newEntity.conditionentitylist.splice(index, 1);
                    }
                };
                //Kondíció csak kondtípus után választható
            }
        }
        else {
            // Index
            //$timeout($scope.loadEnded());
        }

        if ($scope.sportmodel.absUrl.indexOf('listazas') !== -1) {
            $scope.sportmodel.selectedEntityId = -1;

            $scope.askEntityById = function () {
                if ($scope.sportmodel.baseurl) {
                    $.ajax({
                        url: $scope.sportmodel.baseurl + $scope.currPartUrl.base + $scope.sportmodel.selectedEntityId,
                        type: 'GET',
                        async: true,
                        error: function (error) {
                            alert(error.statusText);
                        },
                        success: function (result) {
                            $scope.sportmodel.currentlist.selectedEntity = result;

                            $timeout($scope.loadEnded());
                        }
                    });
                } else {
                    alert('Nincs megadva a szerver elérésiútja');

                    $scope.showall = false;
                }

            };

            //Listázás

            $scope.sportmodel.currentlist.order = 'asc';
            $scope.sportmodel.currentlist.offset = 0;
            $scope.sportmodel.currentlist.page = 1;
            $scope.sportmodel.currentlist.limit = 10;
            $scope.sportmodel.currentlist.maxpages = 0;


            //$scope.currPartUrl.askAllNameDescription = $scope.currPartUrl.base + 'namedescription/all';
            //$scope.currPartUrl.askAllIdName = $scope.currPartUrl.base + 'idname/all';

            if ($scope.sportmodel.absUrl.indexOf('bajnoksag_') !== -1) {
                $scope.currPartUrl.askAll = $scope.currPartUrl.base + 'entity/all';

                $scope.askAllEntities = function () {
                    if ($scope.sportmodel.baseurl) {
                        $scope.doneLoading = false;
                        $.ajax({
                            url: $scope.sportmodel.baseurl + $scope.currPartUrl.askAll,
                            type: 'GET',
                            async: true,
                            contentType: 'application/json',
                            error: function (error) {
                                alert(error.statusText);
                                $timeout($scope.loadEnded());
                            },
                            success: function (result) {
                                $scope.sportmodel.currentlist.list = result;
                                $timeout($scope.loadEnded());
                            }
                        });
                    } else {
                        alert('Nincs megadva a szerver elérésiútja');

                        $scope.showall = false;
                    }
                };

                $scope.OrderAsc = function () {
                    $scope.sportmodel.currentlist.order = 'asc';
                    $scope.askAllEntities();
                };
                $scope.OrderDesc = function () {
                    $scope.sportmodel.currentlist.order = 'desc';
                    $scope.askAllEntities();
                };

                $scope.sportmodel.currentlist.maxpages = 1;

                $scope.askAllEntities();

            } else {
                $scope.currPartUrl.askAllOrderSkipTake = $scope.currPartUrl.base + 'entity/page';

                $scope.nextPage = function () {
                    if ($scope.sportmodel.currentlist.maxpages > $scope.sportmodel.currentlist.page) {
                        $scope.sportmodel.currentlist.page += 1;

                        $scope.askAllEntityOrderSkipTake();
                    }
                };

                $scope.prevPage = function () {
                    if (1 < $scope.sportmodel.currentlist.page) {
                        $scope.sportmodel.currentlist.page -= 1;

                        $scope.askAllEntityOrderSkipTake();
                    }
                };

                $scope.OrderAsc = function () {
                    $scope.sportmodel.currentlist.order = 'asc';
                    $scope.askAllEntityOrderSkipTake();
                };
                $scope.OrderDesc = function () {
                    $scope.sportmodel.currentlist.order = 'desc';
                    $scope.askAllEntityOrderSkipTake();
                };

                if ($scope.sportmodel.absUrl.indexOf('kondicio_') !== -1) {
                    $scope.sportmodel.Conditiontypes = [];

                    $scope.sportmodel.selectedconditiontypeId = -1;

                    $scope.getConditiontypes = function () {
                        if ($scope.sportmodel.baseurl) {
                            $scope.doneLoading = false;
                            $.ajax({
                                url: $scope.sportmodel.baseurl + '/sport/rest/conditiontype/idname/all',
                                type: 'GET',
                                async: true,
                                contentType: 'application/json',
                                error: function (error) {
                                    alert(error.statusText);
                                    $timeout($scope.loadEnded());
                                },
                                success: function (result) {
                                    $scope.sportmodel.Conditiontypes = result;
                                    $timeout($scope.loadEnded());
                                }
                            });
                        } else {
                            alert('Nincs megadva a szerver elérésiútja');

                            $scope.showall = false;
                        }
                    };

                    $scope.getConditiontypes();

                    $scope.askAllEntityOrderSkipTake = function () {
                        if ($scope.sportmodel.baseurl) {
                            if ($scope.sportmodel.selectedconditiontypeId !== -1) {

                                $scope.doneLoading = false;

                                $scope.sportmodel.currentlist.offset = ($scope.sportmodel.currentlist.page - 1) * $scope.sportmodel.currentlist.limit;

                                $.ajax({
                                    url: $scope.sportmodel.baseurl + $scope.currPartUrl.askAllOrderSkipTake + '/' + $scope.sportmodel.selectedconditiontypeId,
                                    type: 'GET',
                                    async: true,
                                    //                        beforeSend: function (xhr) {
                                    //                            xhr.setRequestHeader("Authorization", "Basic " + $scope.beforeSend);
                                    //                        },
                                    data: {
                                        'order': $scope.sportmodel.currentlist.order,
                                        'offset': $scope.sportmodel.currentlist.offset,
                                        'limit': $scope.sportmodel.currentlist.limit
                                    },
                                    error: function (error) {
                                        alert(error.statusText);

                                        $timeout($scope.loadEnded());
                                    },
                                    success: function (result) {
                                        $scope.sportmodel.currentlist.list = result.rows;

                                        $scope.sportmodel.currentlist.total = result.total;

                                        $scope.sportmodel.currentlist.maxpages = Math.ceil($scope.sportmodel.currentlist.total / $scope.sportmodel.currentlist.limit);

                                        $timeout($scope.loadEnded());
                                    }
                                });
                            } else {
                                alert('Kérem válasszon egyet a kondíciótípus legördülőlistából!');
                            }
                        } else {
                            alert('Nincs megadva a szerver elérésiútja');

                            $scope.showall = false;
                        }
                    };

                }
                else {
                    $scope.askAllEntityOrderSkipTake = function () {
                        if ($scope.sportmodel.baseurl) {

                            $scope.doneLoading = false;

                            $scope.sportmodel.currentlist.offset = ($scope.sportmodel.currentlist.page - 1) * $scope.sportmodel.currentlist.limit;

                            $.ajax({
                                url: $scope.sportmodel.baseurl + $scope.currPartUrl.askAllOrderSkipTake,
                                type: 'GET',
                                async: true,
                                //                        beforeSend: function (xhr) {
                                //                            xhr.setRequestHeader("Authorization", "Basic " + $scope.beforeSend);
                                //                        },
                                data: {
                                    'order': $scope.sportmodel.currentlist.order,
                                    'offset': $scope.sportmodel.currentlist.offset,
                                    'limit': $scope.sportmodel.currentlist.limit
                                },
                                error: function (error) {
                                    alert(error.statusText);

                                    $timeout($scope.loadEnded());
                                },
                                success: function (result) {
                                    $scope.sportmodel.currentlist.list = result.rows;

                                    $scope.sportmodel.currentlist.total = result.total;

                                    $scope.sportmodel.currentlist.maxpages = Math.ceil($scope.sportmodel.currentlist.total / $scope.sportmodel.currentlist.limit);

                                    $timeout($scope.loadEnded());
                                }
                            });
                        } else {
                            alert('Nincs megadva a szerver elérésiútja');

                            $scope.showall = false;
                        }
                    };

                    $scope.askAllEntityOrderSkipTake();
                }
            }

            //$scope.askAllEntityNameDescription = function () {
            //    if ($scope.sportmodel.baseurl) {
            //        $.ajax({
            //            url: $scope.sportmodel.baseurl + $scope.currPartUrl.askAllNameDescription,
            //            type: 'GET',
            //            async: true,
            //            //                        beforeSend: function (xhr) {
            //            //                            xhr.setRequestHeader("Authorization", "Basic " + $scope.beforeSend);
            //            //                        },
            //            error: function (error) {
            //                alert(error.statusText);
            //                $timeout($scope.loadEnded());
            //            },
            //            success: function (result) {
            //                $scope.sportmodel.currentlist.sportDescriptions = result;
            //                $timeout($scope.loadEnded());
            //            }
            //        });
            //    } else {
            //        alert('Nincs megadva a szerver elérésiútja');
            //    }
            //};
            //$scope.askAllEntityIdName = function () {
            //    if ($scope.sportmodel.baseurl) {
            //        $.ajax({
            //            url: $scope.sportmodel.baseurl + $scope.currPartUrl.askAllIdName,
            //            type: 'GET',
            //            async: true,
            //            //                        beforeSend: function (xhr) {
            //            //                            xhr.setRequestHeader("Authorization", "Basic " + $scope.beforeSend);
            //            //                        },
            //            error: function (error) {
            //                alert(error.statusText);
            //                $timeout($scope.loadEnded());
            //            },
            //            success: function (result) {
            //                $scope.sportmodel.currentlist.sportIds = result;
            //                $timeout($scope.loadEnded());
            //            }
            //        });
            //    } else {
            //        alert('Nincs megadva a szerver elérésiútja');
            //    }
            //};

        } else if ($scope.sportmodel.absUrl.indexOf('felvitel') !== -1) {
            $scope.sportmodel.selectedEntityId = -1;

            $scope.askEntityById = function () {
                if ($scope.sportmodel.baseurl) {
                    $.ajax({
                        url: $scope.sportmodel.baseurl + $scope.currPartUrl.base + $scope.sportmodel.selectedEntityId,
                        type: 'GET',
                        async: true,
                        error: function (error) {
                            alert(error.statusText);
                        },
                        success: function (result) {
                            $scope.sportmodel.currentlist.selectedEntity = result;

                            $timeout($scope.loadEnded());
                        }
                    });
                } else {
                    alert('Nincs megadva a szerver elérésiútja');

                    $scope.showall = false;
                }

            };

            $scope.beforeSend = window.btoa(unescape(encodeURIComponent("manager:admin")));

            $scope.saveEntity = function () {
                if ($scope.sportmodel.baseurl) {

                    $scope.doneLoading = false;

                    var mydata = $scope.jsonForSave();

                    $.ajax({
                        beforeSend: function (xhr) {
                            xhr.setRequestHeader("Authorization", "Basic " + $scope.beforeSend);
                        },
                        url: $scope.sportmodel.baseurl + $scope.currPartUrl.base + $scope.currPartUrl.savenave,
                        type: 'POST',
                        contentType: 'application/json',
                        data: mydata,
                        error: function (error) {
                            alert(error.statusText);

                            $timeout($scope.loadEnded());
                        },
                        success: function (message) {
                            alert('sikeres mentés');

                            $scope.initializenewEntity();

                            $timeout($scope.loadEnded());
                        }
                    });
                } else {
                    alert('Nincs megadva a szerver elérésiútja');

                    $scope.showall = false;
                }

            };

            if ($scope.sportmodel.absUrl.indexOf('kondicio_') !== -1) {
                $scope.sportmodel.Conditiontypes = [];

                //$scope.sportmodel.newEntity.typeid = -1;

                $scope.getConditiontypes = function () {
                    if ($scope.sportmodel.baseurl) {
                        $scope.doneLoading = false;
                        $.ajax({
                            url: $scope.sportmodel.baseurl + '/sport/rest/conditiontype/idname/all',
                            type: 'GET',
                            async: true,
                            contentType: 'application/json',
                            error: function (error) {
                                alert(error.statusText);
                                $timeout($scope.loadEnded());
                            },
                            success: function (result) {
                                $scope.sportmodel.Conditiontypes = result;
                                $timeout($scope.loadEnded());
                            }
                        });
                    } else {
                        alert('Nincs megadva a szerver elérésiútja');

                        $scope.showall = false;
                    }
                };

                $scope.getConditiontypes();
            }

            $scope.initializenewEntity();
        }

        $('#serveraddress').focusout(function () {
            $cookies.put('apiserverurl', $scope.sportmodel.baseurl);
        });
    }]);