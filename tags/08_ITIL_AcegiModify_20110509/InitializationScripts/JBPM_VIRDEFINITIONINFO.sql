if exists (select * from dbo.sysobjects where id = object_id(N'[dbo].[JBPM_VIRDEFINITIONINFO]') and OBJECTPROPERTY(id, N'IsUserTable') = 1)
drop table [dbo].[JBPM_VIRDEFINITIONINFO]
GO

CREATE TABLE [dbo].[JBPM_VIRDEFINITIONINFO] (
	[id] [bigint] IDENTITY (1, 1) NOT NULL ,
	[realDefinitionName] [varchar] (50) COLLATE Chinese_PRC_CI_AS NULL ,
	[virtualDefinitionName] [varchar] (50) COLLATE Chinese_PRC_CI_AS NULL ,
	[realDefinitionDesc] [varchar] (50) COLLATE Chinese_PRC_CI_AS NULL ,
	[virtualDefinitionDesc] [varchar] (50) COLLATE Chinese_PRC_CI_AS NULL ,
	[ruleFileName] [varchar] (250) COLLATE Chinese_PRC_CI_AS NULL ,
	[dept] [bigint] NULL ,
	[type] [bigint] NULL ,
	[processDefinitionId] [bigint] NULL ,
	[emailTemplate] [ntext] COLLATE Chinese_PRC_CI_AS NULL 
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO

