var todoView = Backbone.View.extend({

	tagName: "li",
	// will render each time a new view is created

	template: Handlebars.compile($("#modelTemplate").html()),

	events: {
		"click [type='checkbox']": "strikeout",
		"click #edit": "editView",
		"click #save": "render",
		"click #delete": "deleteView"
	},

	initialize: function(){
		this.render();
	},
	render: function(){
		this.$el.html(this.template(this.model.toJSON()));
		return this;
	},
	strikeout: function(){
			if (this.$el.css("textDecoration") === "none"){
			this.$el.css("textDecoration", "line-through");
			this.model.set("completed", true);
		}	else {
			this.$el.css("textDecoration", "none");
			this.model.set("completed", false);
		}
	},
	editView: function(){
		// if the view exists
		if($(".test").length === 0){
		var editView = new editTodoView({model: this.model});
		this.$el.append(editView.render().el);
		} else {
			return ;
		}
		
	},
	deleteView: function(){
		this.model.destroy();
		this.remove();
	},

});

var editTodoView = Backbone.View.extend({
	events: {
		"click button": "saveEdit",
		"keypress input": "createOnEnter"
	},

	template: Handlebars.compile($("#editTemplate").html()),

	render: function(){
		this.$el.html(this.template(this.model.toJSON()));
		return this;
	},
	saveEdit: function(){
		if ($(".test").val() === "" || null){
			return;
		} else {
		var savedInput = this.$el.find("input").val();
		this.model.set({"title": savedInput});
		console.log("Model title changed to " + this.model.get("title"));
		}
	},
	createOnEnter: function(event){
	if (event.which !== 13 || !this.$el.find("input").val().trim()){
		return;
		// 13 is keyCode property for "Enter Key"
	}
	this.saveEdit();
	}
});
