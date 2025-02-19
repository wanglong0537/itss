Ext.form.CheckboxGroup=Ext.extend(Ext.form.Field,{
	columns:"auto",
	vertical:false,
	allowBlank:true,
	blankText:"You must select at least one item in this group",
	defaultType:"checkbox",
	groupCls:"x-form-check-group",
	isArray : function(v){
			return v && typeof v.length == 'number' && typeof v.splice == 'function';
		},
	onRender:function(H,F){
		if(!this.el){
			var M={
				cls:this.groupCls,
				layout:"column",
				border:false,
			renderTo:H};
			var A={
				defaultType:this.defaultType,
				layout:"form",
				border:false,
				defaults:{
					hideLabel:true,
					anchor:"100%"
				}};
				if(this.items[0]!=undefined&&this.items[0].items){
					Ext.apply(M,{
						layoutConfig:{
						columns:this.items.length},
						defaults:this.defaults,
						items:this.items
					});
					for(var E=0,J=this.items.length;E<J;E++){
						Ext.applyIf(this.items[E],A)
					}
				}else{
					var D,K=[];
					if(typeof this.columns=="string"){
						this.columns=this.items.length
					}
					if(!this.isArray(this.columns)){
						var I=[];
						for(var E=0;E<this.columns;E++){
							I.push((100/this.columns)*0.01)
						}
						this.columns=I
					}
					D=this.columns.length;
					for(var E=0;E<D;E++){
						var B=Ext.apply({
							items:[]
						},A);
						B[this.columns[E]<=1?"columnWidth":"width"]=this.columns[E];
						if(this.defaults){
							B.defaults=Ext.apply(
							B.defaults||{},
							this.defaults)
						}
					K.push(B)}if(this.vertical){
						var O=Math.ceil(this.items.length/D),
						L=0;
						for(var E=0,J=this.items.length;E<J;E++){
							if(E>0&&E%O==0){L++}
							//if(this.items[E].fieldLabel){
							//	this.items[E].hideLabel=false
							//}
							K[L].items.push(this.items[E])
						}
					}
					else{
						for(var E=0,J=this.items.length;E<J;E++){
							var N=E%D;
							//if(this.items[E].fieldLabel){
							//	this.items[E].hideLabel=false
							//}
							K[N].items.push(this.items[E])
						}
					}
					Ext.apply(M,{
						layoutConfig:{
							columns:D
						},
						items:K
					}
					)
				}
				this.panel=new Ext.Panel(M);
				this.el=this.panel.getEl();
				if(this.forId&&this.itemCls){
					var C=this.el.up(this.itemCls).child("label",true);
				if(C){C.setAttribute("htmlFor",this.forId)}}
					var G=this.panel.findBy(function(P){
						return P.isFormField
					},this);
					this.items=new Ext.util.MixedCollection();
					this.items.addAll(G)
				}
			Ext.form.CheckboxGroup.superclass.onRender.call(this,H,F)},
			validateValue:function(A){
				if(!this.allowBlank){
					var B=true;
					this.items.each(function(C){
						if(C.checked){
							return B=false
						}
					},
					this
					);
					if(B){
						this.markInvalid(this.blankText);
						return false
					}
				}
			return true},
			onDisable:function(){
				this.items.each(function(A){
					A.disable()
				}
				)
			},
			onEnable:function(){
				this.items.each(function(A){
					A.enable()
				}
				)
			},
			onResize:function(A,B){
				this.panel.setSize(A,B);
				this.panel.doLayout()
			},
			reset:function(){
				Ext.form.CheckboxGroup.superclass.reset.call(this);
				this.items.each(function(A){
					if(A.reset){
						A.reset()
					}
				},
			this)},
			initValue:Ext.emptyFn,
			getValue:Ext.emptyFn,
			getRawValue:Ext.emptyFn,
			setValue:Ext.emptyFn,
			setRawValue:Ext.emptyFn
		});
		Ext.reg("checkboxgroup",Ext.form.CheckboxGroup);
		
		Ext.form.RadioGroup = Ext.extend(Ext.form.CheckboxGroup, {
		    
		    allowBlank : true,
		    
		    blankText : "You must select one item in this group",
		    
		        defaultType : 'radio',
		    
		        groupCls: 'x-form-radio-group'
		});
		
		Ext.reg('radiogroup', Ext.form.RadioGroup);