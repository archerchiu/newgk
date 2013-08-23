requirejs.config({
	context: 'gk',
	paths: {
		'swfupload': 'lib/uploader/js/swfupload',
		'swf.handler': 'lib/uploader/js/handlers',
		'jquery.filedrop': 'lib/uploader/js/jquery.filedrop'
	},
	callback: function () {
		function loadCss(url, req) {
			var link = document.createElement("link");
			link.type = "text/css";
			link.rel = "stylesheet";
			link.href = req.toUrl(url);
			document.getElementsByTagName("head")[0].appendChild(link);
		}
		var req = requirejs.config({
			context: 'gk'
		});
		loadCss('lib/uploader/css/styles.css', req);
	}
});

// define module (component)
define('uploader', ['swfupload','swf.handler','jquery.filedrop'], function() {
	return {
		template: "<div id='{{id}}' type='button' style='width:36px;height:29px;border:1px solid;border-radius:5px;background:no-repeat url(../../lib/uploader/img/upload_32.png) 2px 1px;' />" +
			"<div id='{{id}}_fileGap' class='gkUploaderFileGap' style='display:none;position:absolute;z-index:99;font-size:14px;font-family:Segoe UI,Arial,sans-serif;background-color:#000000;overflow-y:auto;width:381px;height:125px;border:1px solid;border-radius:5px;margin-top:3px;box-shadow:4px 4px 3px rgba(20%,20%,40%,0.5);'></div>",
		script: function() {
			var $oriEle = this.$originEle,
				$ele = this.$ele,
				_id, $fileGap, $gapMsg;

			var gapTemplate =
				'<div class="gkUploaderPreview">' +
					'<span class="gkUploaderImageHolder">' +
					'<a></a>' +
					'<span class="gkUploaded"></span>' +
					'</span>' +
					'<span class="gkUploaderProgressHolder">' +
					'<span class="gkUploaderProgress"></sapn>' +
					'</span>' +
					'</div>';

			var createImage = function(file) {
				var $gapTemplate = $(gapTemplate),
						aLink = $('a', $gapTemplate),
						reader = new FileReader();

				reader.onload = function (e) {
					//aLink.text(e.target.result);
					aLink.text(file.name);
				};

				// Reading the file as a DataURL. When finished,
				// this will trigger the onload function above:
				reader.readAsDataURL(file);

				$gapMsg.hide();
				$gapTemplate.appendTo($fileGap);

				// Associating a preview container
				// with the file, using jQuery's $.data():
				$.data(file, $gapTemplate);
			}

			var showMessage = function(msg) {
				$gapMsg.html(msg);
			}

			this.init = function() {
				var swfu;

				_id = this.id;
				$fileGap = $("#"+_id+"_fileGap");

				// Check File API support
				if (window.File && window.FileList && window.FileReader) {
					// $fileGap.html("<span><input id='"+_id+"_pickFiles' type='file' multiple /></span><span><input id='"+_id+"_uploadBtn' type='button' value='Upload' style='display:none' /></span>");
					var fileGapLayout =
						"<div id='"+_id+"_gapMsg' style='text-align:center;'>" +
							"<span style='font-size:16px;color:white;'>Drop files here to upload ...</span>" +
							"</div>";
					$fileGap.html(fileGapLayout);

					// perform file gap to give the file handler ability
					$gapMsg = $("#"+_id+"_gapMsg");

					$fileGap.filedrop({
						paramname:'pic',

						url: 'event/multipart/eventBus/handler.save.go?fileId=',

						uploadFinished: function (i, file, response) {
							$.data(file).addClass('done');
						},

						error: function (err, file) {
							switch (err) {
								case 'BrowserNotSupported':
									showMessage('Your browser does not support HTML5 file uploads!');
									break;
								case 'TooManyFiles':
									alert('Too many files! Please select 5 at most! (configurable)');
									break;
								case 'FileTooLarge':
									alert(file.name + ' is too large! Please upload files up to 2mb (configurable).');
									break;
								default:
									break;
							}
						},

						// Called before each upload is started
						beforeEach: function (file) {
						},

						uploadStarted: function (i, file, len) {
							createImage(file);
						},

						progressUpdated: function (i, file, progress) {
							$.data(file).find('.progress').width(progress);
						}
					});

				} else {
					// using SWFUpload, because browser does not support HTML5
					var settings = {
						flash_url : "../swfupload/swfupload.swf",
						upload_url: "event/multipart/eventBus/handler.save.go",
						post_params: {"fileId" : ""},
						file_size_limit : "100 MB",
						file_types : "*.*",
						file_types_description : "All Files",
						file_upload_limit : 100,
						file_queue_limit : 0,
						custom_settings : {
							progressTarget : "fsUploadProgress",
							cancelButtonId : "btnCancel"
						},
						debug: false,

						// Button settings
						button_image_url: "images/TestImageNoText_65x29.png",
						button_width: "65",
						button_height: "29",
						button_placeholder_id: "spanButtonPlaceHolder",
						button_text: '<span class="theFont">Hello</span>',
						button_text_style: ".theFont { font-size: 16; }",
						button_text_left_padding: 12,
						button_text_top_padding: 3,

						// The event handler functions are defined in handlers.js
						file_queued_handler : fileQueued,
						file_queue_error_handler : fileQueueError,
						file_dialog_complete_handler : fileDialogComplete,
						upload_start_handler : uploadStart,
						upload_progress_handler : uploadProgress,
						upload_error_handler : uploadError,
						upload_success_handler : uploadSuccess,
						upload_complete_handler : uploadComplete,
						queue_complete_handler : queueComplete	// Queue plugin event
					};

					var swfGapLayout =
						"<div class='fieldset flash' id='fsUploadProgress'>" +
							"<span class='legend'>Upload Queue</span>" +
							"</div>" +
							"<div id='divStatus'>0 Files Uploaded</div>" +
							"<div>" +
							"<span id='spanButtonPlaceHolder'></span>" +
							"<input id='btnCancel' type='button' value='Cancel All Uploads' onclick='swfu.cancelQueue();' disabled='disabled' style='margin-left: 2px; font-size: 8pt; height: 29px;' />" +
							"</div>";
					$fileGap.html(swfGapLayout);

					swfu = new SWFUpload(settings);
				}

				// event handler
				$("#"+_id).on('click', function() {
					if ($fileGap.is(":visible")) {
						$fileGap.hide();
					}
					else {
						$fileGap.show();
						if ($(window).width() - ($fileGap.offset().left + $fileGap.outerWidth()) < 0) {
							$fileGap.css('left', $fileGap.offset().left - 345);
						}
						if ($(window).height() - ($fileGap.offset().top + $fileGap.outerHeight()) < 0) {
							$fileGap.css('top', $fileGap.offset().top - 161);
						}
					}
				});

				$("#"+_id+"_pickFiles").on('change', function() {
					var files = this.files,
						fileRow = "<ul>",
						$uploadBtn = $("#"+_id+"_uploadBtn");

					if (files.length > 0) {
						for (var i = 0, f; f = files[i]; i++) {
							fileRow += "<li>"+ f.name +"</li>";
						}
						fileRow += "</ul>";
						$uploadBtn.next().remove();
						$uploadBtn.after(fileRow);
						$uploadBtn.show();
					} else {
						$uploadBtn.next().remove();
						$uploadBtn.hide();
					}
				});

			};
		}
	};
});