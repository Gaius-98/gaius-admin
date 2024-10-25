/*
 Navicat MySQL Data Transfer

 Source Server         : 120.26.161.36
 Source Server Type    : MySQL
 Source Server Version : 50740
 Source Host           : 120.26.161.36:3306
 Source Schema         : gaius_admin

 Target Server Type    : MySQL
 Target Server Version : 50740
 File Encoding         : 65001

 Date: 25/10/2024 21:00:36
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for sys_dict_data
-- ----------------------------
DROP TABLE IF EXISTS `sys_dict_data`;
CREATE TABLE `sys_dict_data`  (
  `id` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `label` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '字典翻译',
  `value` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '字典值',
  `sort_num` int(11) NOT NULL COMMENT '排序号',
  `status` char(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '1' COMMENT '状态',
  `create_time` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `dict_type_id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '所属字典类型id',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of sys_dict_data
-- ----------------------------
INSERT INTO `sys_dict_data` VALUES ('13eb8246-e58f-42f4-8076-23d6c8d6721b', '女', '0', 1, '1', '2024-10-12 23:50:23', 'e30df8b1-91a4-43e1-aaa3-829a58c6cffc');
INSERT INTO `sys_dict_data` VALUES ('1b00e8bc-d8be-4614-8d53-dc6ad2e5361f', '动态数据源', 'dynamic', 0, '1', '2024-10-12 23:49:14', '7ed56e85-ed24-485a-9624-e95703d70e93');
INSERT INTO `sys_dict_data` VALUES ('1e5a8ccf-4182-4ecb-86ab-4b0864c266a8', '嵌入页', 'iframe', 4, '1', '2024-10-13 11:09:56', 'bac96d95-caa1-403b-a208-53b41d517830');
INSERT INTO `sys_dict_data` VALUES ('30ae141e-a4e4-4595-bc4c-0e1e8950f91a', '水平', 'horizontal', 0, '1', '2024-10-13 02:05:18', '29de34d1-5313-423c-8ea4-abb1f9eb12d5');
INSERT INTO `sys_dict_data` VALUES ('31082164-7298-4d58-a563-6297490f43e9', '私有', 'private', 0, '1', '2024-10-12 23:25:29', 'eaf6271f-e09f-4cb9-bdb5-c7fd564fdd33');
INSERT INTO `sys_dict_data` VALUES ('3aefe27c-80c4-4efc-81e9-91974991573c', '系统配置', 'system', 0, '1', '2024-10-13 02:02:41', 'ff0d2172-fc2f-4f19-99d9-02ea321459a2');
INSERT INTO `sys_dict_data` VALUES ('40addef1-1881-4a98-9e9a-ddb9768e8cc6', '停用', '0', 1, '1', '2024-10-12 23:21:53', '85973c4c-0cf3-4331-be5b-003c9ccdfd9d');
INSERT INTO `sys_dict_data` VALUES ('422ff77c-ecbc-4859-bdc5-fbc2f36d77dc', '仅本机构数据权限', '3', 2, '1', '2024-10-18 17:52:07', '2b22cfe4-d056-401c-b093-f6cb8ca9ce4d');
INSERT INTO `sys_dict_data` VALUES ('4606a0e5-522f-4b05-b11b-7528bade88a5', '可视化', 'visual', 3, '1', '2024-10-12 23:29:09', 'bac96d95-caa1-403b-a208-53b41d517830');
INSERT INTO `sys_dict_data` VALUES ('47cb9047-b38e-48a2-8806-f6fb767a51e3', '普通页面', 'front', 0, '1', '2024-10-12 23:28:34', 'bac96d95-caa1-403b-a208-53b41d517830');
INSERT INTO `sys_dict_data` VALUES ('4f4c3329-afd8-41d9-81a9-36f8ad67167a', '下载', '6', 6, '1', '2024-10-24 10:35:22', '69d1b621-04c9-4017-8aee-27f5acc06761');
INSERT INTO `sys_dict_data` VALUES ('505619fc-c336-4904-b298-799533767f6e', '新标签页', '_blank', 0, '1', '2024-10-13 11:15:49', '30c366b7-f654-4250-9175-53bf1d1a5a8b');
INSERT INTO `sys_dict_data` VALUES ('598530b2-be80-4689-adce-32811dbab96f', '启用', '1', 0, '1', '2024-10-12 23:22:06', '85973c4c-0cf3-4331-be5b-003c9ccdfd9d');
INSERT INTO `sys_dict_data` VALUES ('5e5feac9-be9f-4dd5-947b-48b8a855737f', '新增', '0', 0, '1', '2024-10-24 10:34:12', '69d1b621-04c9-4017-8aee-27f5acc06761');
INSERT INTO `sys_dict_data` VALUES ('69a9d37e-b779-4a62-94cd-9f1ae5cf6829', '公共', 'public', 1, '1', '2024-10-12 23:25:41', 'eaf6271f-e09f-4cb9-bdb5-c7fd564fdd33');
INSERT INTO `sys_dict_data` VALUES ('7355206a-1f54-4bce-9ed2-992270cba71e', '其他', '7', 7, '1', '2024-10-24 10:35:31', '69d1b621-04c9-4017-8aee-27f5acc06761');
INSERT INTO `sys_dict_data` VALUES ('7683fae8-9673-4d54-a9ee-b7180e7ea805', '导出', '3', 3, '1', '2024-10-24 10:34:52', '69d1b621-04c9-4017-8aee-27f5acc06761');
INSERT INTO `sys_dict_data` VALUES ('7a614bb2-99b4-4886-a5b3-52be0f8b58b2', '编辑', '1', 1, '1', '2024-10-24 10:34:27', '69d1b621-04c9-4017-8aee-27f5acc06761');
INSERT INTO `sys_dict_data` VALUES ('7fa49b0e-6e1d-468f-aa5c-b01f94798559', '表单页', 'form', 1, '1', '2024-10-12 23:28:46', 'bac96d95-caa1-403b-a208-53b41d517830');
INSERT INTO `sys_dict_data` VALUES ('82860cf2-e40d-4520-b996-135c3fb11ab1', '垂直', 'vertical', 1, '1', '2024-10-13 02:05:34', '29de34d1-5313-423c-8ea4-abb1f9eb12d5');
INSERT INTO `sys_dict_data` VALUES ('87474169-be50-482c-9b02-c19b23bdda95', '其他配置', 'other', 1, '1', '2024-10-13 02:02:50', 'ff0d2172-fc2f-4f19-99d9-02ea321459a2');
INSERT INTO `sys_dict_data` VALUES ('95685787-f973-43f0-b984-ecc90642158e', '中文', 'chinese', 0, '1', '2024-10-13 02:03:52', 'd8850276-f440-419b-b66e-bfc9aac8ec97');
INSERT INTO `sys_dict_data` VALUES ('9b962203-ea46-49dd-ab10-13749b6fc14a', '删除', '2', 2, '1', '2024-10-24 10:34:41', '69d1b621-04c9-4017-8aee-27f5acc06761');
INSERT INTO `sys_dict_data` VALUES ('9ce8352e-50cc-46b4-a280-e1026cae3092', '英语', 'english', 1, '0', '2024-10-13 02:04:04', 'd8850276-f440-419b-b66e-bfc9aac8ec97');
INSERT INTO `sys_dict_data` VALUES ('9e709175-d6b4-43ea-89b5-b4fe41b5d332', '静态数据源', 'static', 1, '1', '2024-10-12 23:49:23', '7ed56e85-ed24-485a-9624-e95703d70e93');
INSERT INTO `sys_dict_data` VALUES ('a7d3b1f7-58dc-4584-90eb-258d3dec78da', '权限点', 'permission', 2, '1', '2024-10-13 11:12:54', 'c20a38eb-fa63-490c-a3d3-893c5e78e2c4');
INSERT INTO `sys_dict_data` VALUES ('b402891d-9c34-4646-88a9-a2495540fcb9', 'Post', 'post', 1, '1', '2024-10-12 23:27:27', '2bfab1e5-9121-4b56-a7e7-a7b6ebc597ef');
INSERT INTO `sys_dict_data` VALUES ('c2108d3e-be4d-4aac-b0df-13b3a0313acc', '导入', '4', 4, '1', '2024-10-24 10:35:04', '69d1b621-04c9-4017-8aee-27f5acc06761');
INSERT INTO `sys_dict_data` VALUES ('c24a49c3-06b7-47ff-b09d-3c77e09d0485', '菜单', 'app', 1, '1', '2024-10-13 11:12:41', 'c20a38eb-fa63-490c-a3d3-893c5e78e2c4');
INSERT INTO `sys_dict_data` VALUES ('c2767a61-aa3a-423e-9802-1fc8ab7682ce', 'Get', 'get', 0, '1', '2024-10-12 23:27:16', '2bfab1e5-9121-4b56-a7e7-a7b6ebc597ef');
INSERT INTO `sys_dict_data` VALUES ('ccbb1e7e-3d91-4385-9b81-f64a7d67905e', '男', '1', 0, '1', '2024-10-12 23:49:42', 'e30df8b1-91a4-43e1-aaa3-829a58c6cffc');
INSERT INTO `sys_dict_data` VALUES ('d886cc82-23de-468d-b3e3-6072c39663ca', '仅本人权限', '4', 3, '1', '2024-10-18 17:52:31', '2b22cfe4-d056-401c-b093-f6cb8ca9ce4d');
INSERT INTO `sys_dict_data` VALUES ('e2b61e0d-60f5-40a0-8645-cbc5ebffaed6', '本机构及下属机构数据权限', '2', 1, '1', '2024-10-18 17:51:45', '2b22cfe4-d056-401c-b093-f6cb8ca9ce4d');
INSERT INTO `sys_dict_data` VALUES ('e58e213d-7641-4714-9d19-90bf9645d2d3', '列表页', 'table', 2, '1', '2024-10-12 23:28:56', 'bac96d95-caa1-403b-a208-53b41d517830');
INSERT INTO `sys_dict_data` VALUES ('e850c3dd-a287-4997-8f6d-7b9fd8383c4a', '目录', 'directory', 0, '1', '2024-10-13 11:12:31', 'c20a38eb-fa63-490c-a3d3-893c5e78e2c4');
INSERT INTO `sys_dict_data` VALUES ('e9d3dc4d-2602-4cec-a33e-f08d9d82518d', '上传', '5', 5, '1', '2024-10-24 10:35:14', '69d1b621-04c9-4017-8aee-27f5acc06761');
INSERT INTO `sys_dict_data` VALUES ('f4c1d2c7-515d-4fa2-91bf-1ce2f5ff2ad8', '所有机构数据权限', '1', 0, '1', '2024-10-18 17:51:25', '2b22cfe4-d056-401c-b093-f6cb8ca9ce4d');
INSERT INTO `sys_dict_data` VALUES ('fcf9a7be-4f22-4074-bf68-0d5d4244c026', '当前页面', '_self', 1, '1', '2024-10-13 11:16:10', '30c366b7-f654-4250-9175-53bf1d1a5a8b');

-- ----------------------------
-- Table structure for sys_dict_type
-- ----------------------------
DROP TABLE IF EXISTS `sys_dict_type`;
CREATE TABLE `sys_dict_type`  (
  `id` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `dict_type` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '字典类型值',
  `dict_type_desc` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '字典类型翻译',
  `status` char(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '1' COMMENT '状态',
  `create_time` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `remark` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '备注',
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `IDX_f4e4273658733a3bbe6a2479bf`(`dict_type`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of sys_dict_type
-- ----------------------------
INSERT INTO `sys_dict_type` VALUES ('29de34d1-5313-423c-8ea4-abb1f9eb12d5', 'layout', '布局方式', '1', '2024-10-13 02:04:37', '');
INSERT INTO `sys_dict_type` VALUES ('2b22cfe4-d056-401c-b093-f6cb8ca9ce4d', 'dataPerm', '数据权限', '1', '2024-10-18 17:50:50', '');
INSERT INTO `sys_dict_type` VALUES ('2bfab1e5-9121-4b56-a7e7-a7b6ebc597ef', 'requestMethod', '请求方式', '1', '2024-10-12 23:20:52', '');
INSERT INTO `sys_dict_type` VALUES ('30c366b7-f654-4250-9175-53bf1d1a5a8b', 'openType', '打开页面类型', '1', '2024-10-13 11:14:25', '');
INSERT INTO `sys_dict_type` VALUES ('69d1b621-04c9-4017-8aee-27f5acc06761', 'optType', '操作类型', '1', '2024-10-24 10:33:36', '操作日志的操作类型');
INSERT INTO `sys_dict_type` VALUES ('7ed56e85-ed24-485a-9624-e95703d70e93', 'dataSource', '数据源类型', '1', '2024-10-12 23:30:32', '');
INSERT INTO `sys_dict_type` VALUES ('85973c4c-0cf3-4331-be5b-003c9ccdfd9d', 'status', '状态', '1', '2024-10-12 23:21:34', '');
INSERT INTO `sys_dict_type` VALUES ('bac96d95-caa1-403b-a208-53b41d517830', 'pageType', '页面类型', '1', '2024-10-12 23:21:02', '');
INSERT INTO `sys_dict_type` VALUES ('c20a38eb-fa63-490c-a3d3-893c5e78e2c4', 'menuType', '菜单类型', '1', '2024-10-13 11:11:38', '');
INSERT INTO `sys_dict_type` VALUES ('d8850276-f440-419b-b66e-bfc9aac8ec97', 'language', '语言', '1', '2024-10-13 02:03:32', '');
INSERT INTO `sys_dict_type` VALUES ('e30df8b1-91a4-43e1-aaa3-829a58c6cffc', 'sex', '性别', '1', '2024-10-12 23:49:35', '');
INSERT INTO `sys_dict_type` VALUES ('eaf6271f-e09f-4cb9-bdb5-c7fd564fdd33', 'belong', '归属', '1', '2024-10-12 23:20:39', '');
INSERT INTO `sys_dict_type` VALUES ('ff0d2172-fc2f-4f19-99d9-02ea321459a2', 'configType', '配置类型', '1', '2024-10-13 02:02:28', '');

-- ----------------------------
-- Table structure for sys_login_log
-- ----------------------------
DROP TABLE IF EXISTS `sys_login_log`;
CREATE TABLE `sys_login_log`  (
  `id` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `ip` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT 'ip地址',
  `address` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '地址',
  `username` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '用户名',
  `os` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '系统',
  `browser` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '浏览器',
  `create_time` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for sys_menu
-- ----------------------------
DROP TABLE IF EXISTS `sys_menu`;
CREATE TABLE `sys_menu`  (
  `id` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '菜单id、权限点id',
  `label` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '名称',
  `parent_id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '上级id',
  `menu_type` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '类型：directory-目录，app-菜单，permission-权限点',
  `route_address` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '路由地址',
  `icon` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '图标',
  `sort_num` int(11) NOT NULL COMMENT '排序号',
  `type` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '页面类型：table-表格，front-普通页面，page-仪表板页面，form-表单页面,iframe-嵌入页 ',
  `openType` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '菜单打开方式: _blank-新页面，_self-本页面',
  `status` char(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '1' COMMENT '状态',
  `create_time` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `permission_id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '权限标识',
  `remark` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '备注',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of sys_menu
-- ----------------------------
INSERT INTO `sys_menu` VALUES ('088015e8-9a25-4202-a4f6-f05ebad41f1f', '用户管理', 'ea018f53-0978-47f0-87c9-5d3f10152351', 'app', '/system/user', 'user', 1, 'front', '_self', '1', '2024-04-15 22:26:25', '', NULL);
INSERT INTO `sys_menu` VALUES ('0b269829-8045-4e8a-8b3a-da12d86f2483', '配置管理-详情', '75f7c4c0-d645-4974-9d13-063c01fa3f5e', 'permission', '', NULL, 4, 'front', '_self', '1', '2024-10-14 22:32:32', 'system:setting:detail', NULL);
INSERT INTO `sys_menu` VALUES ('0ed9f4c3-cf5c-4c39-bcc2-71119ae357e4', '通知管理-详情', 'd526edad-b55a-48d5-83e0-ccd3903b7fdf', 'permission', '', NULL, 2, 'front', '_self', '1', '2024-10-19 20:27:01', 'system:notice:detail', NULL);
INSERT INTO `sys_menu` VALUES ('19625d5c-e6e6-4d6c-14d8-dda1d311cd3d', '字典管理-删除', '210c010c-2b7c-4c8b-bab2-c049e9a32c5f', 'permission', '', NULL, 2, 'front', '_self', '1', '2024-10-13 12:25:46', 'system:dict:remove', NULL);
INSERT INTO `sys_menu` VALUES ('19625d5c-e6e6-4d6c-84d8-dda1d311cd21', '用户管理-删除', '088015e8-9a25-4202-a4f6-f05ebad41f1f', 'permission', '', NULL, 2, 'front', '_self', '1', '2024-10-13 12:25:46', 'system:user:remove', NULL);
INSERT INTO `sys_menu` VALUES ('19625d5c-e6e6-4d6c-84d8-dda1d311cd2d', '菜单管理-删除', 'c6f2d8e8-d9d2-4de9-8378-5873f3032b96', 'permission', '', NULL, 2, 'front', '_self', '1', '2024-10-13 12:25:46', 'system:menu:remove', NULL);
INSERT INTO `sys_menu` VALUES ('19625d5c-e6e6-4d6c-84d8-dda1d311cd3d', '角色管理-删除', '25545f61-a93a-4f42-9f80-743d0ceb2019', 'permission', '', NULL, 2, 'front', '_self', '1', '2024-10-13 12:25:46', 'system:role:remove', NULL);
INSERT INTO `sys_menu` VALUES ('1ccff2ba-ed02-40df-1f0d-d2251d07b14e', '字典管理-编辑', '210c010c-2b7c-4c8b-bab2-c049e9a32c5f', 'permission', '', NULL, 3, 'front', '_self', '1', '2024-10-13 12:26:04', 'system:dict:update', NULL);
INSERT INTO `sys_menu` VALUES ('1ccff2ba-ed02-40df-bf0d-d2251d07b143', '角色管理-编辑', '25545f61-a93a-4f42-9f80-743d0ceb2019', 'permission', '', NULL, 3, 'front', '_self', '1', '2024-10-13 12:26:04', 'system:role:update', NULL);
INSERT INTO `sys_menu` VALUES ('1ccff2ba-ed02-40df-bf0d-d2251d07b1f8', '用户管理-编辑', '088015e8-9a25-4202-a4f6-f05ebad41f1f', 'permission', '', NULL, 3, 'front', '_self', '1', '2024-10-13 12:26:04', 'system:user:update', NULL);
INSERT INTO `sys_menu` VALUES ('1ccff2ba-ed02-40df-bf0d-d2251d07b1fe', '菜单管理-编辑', 'c6f2d8e8-d9d2-4de9-8378-5873f3032b96', 'permission', '', NULL, 3, 'front', '_self', '1', '2024-10-13 12:26:04', 'system:menu:update', NULL);
INSERT INTO `sys_menu` VALUES ('1ceb1725-29dd-486b-95e5-d4d158e2eaa7', '资源管理', 'ea018f53-0978-47f0-87c9-5d3f10152351', 'app', '/system/resource', 'database', 6, 'front', '_self', '1', '2024-05-20 20:24:31', '', NULL);
INSERT INTO `sys_menu` VALUES ('1d060bd3-6aae-4e39-9335-cb93cae038d2', '资源管理-列表', '1ceb1725-29dd-486b-95e5-d4d158e2eaa7', 'permission', '', NULL, 0, 'front', '_self', '1', '2024-10-25 20:22:31', 'system:resource:list', NULL);
INSERT INTO `sys_menu` VALUES ('210c010c-2b7c-4c8b-bab2-c049e9a32c5f', '字典管理', 'ea018f53-0978-47f0-87c9-5d3f10152351', 'app', '/system/dict', 'align-left', 3, 'front', '_self', '1', '2024-04-15 09:52:28', '', NULL);
INSERT INTO `sys_menu` VALUES ('25545f61-a93a-4f42-9f80-743d0ceb2019', '角色管理', 'ea018f53-0978-47f0-87c9-5d3f10152351', 'app', '/system/role', 'switchuser', 4, 'front', '_self', '1', '2024-04-16 23:00:52', '', NULL);
INSERT INTO `sys_menu` VALUES ('269962ec-fefe-4adb-9624-b12fa6ef79d3', '通知管理-新增', 'd526edad-b55a-48d5-83e0-ccd3903b7fdf', 'permission', '', NULL, 0, 'front', '_self', '1', '2024-10-19 20:26:09', 'system:notice:add', NULL);
INSERT INTO `sys_menu` VALUES ('30d2fd74-2c48-4c9c-b3a1-177f2b656aee', '机构管理', 'ea018f53-0978-47f0-87c9-5d3f10152351', 'app', '/system/org', 'team', 1, 'front', '_self', '1', '2024-10-18 16:17:07', '', NULL);
INSERT INTO `sys_menu` VALUES ('36d85817-3709-41c6-8ac7-7a1a3924c883', '机构管理-新增', '30d2fd74-2c48-4c9c-b3a1-177f2b656aee', 'permission', '', NULL, 0, 'front', '_self', '1', '2024-10-18 16:17:49', 'system:org:add', NULL);
INSERT INTO `sys_menu` VALUES ('3a90974e-e1c4-460b-bdc4-9cd57031d929', '资源管理-删除', '1ceb1725-29dd-486b-95e5-d4d158e2eaa7', 'permission', '', NULL, 2, 'front', '_self', '1', '2024-10-25 20:23:05', 'system:resource:remove', NULL);
INSERT INTO `sys_menu` VALUES ('49b3217b-c5d4-4acf-be3c-8ca7add2a368', '配置管理-查询', '75f7c4c0-d645-4974-9d13-063c01fa3f5e', 'permission', '', NULL, 3, 'front', '_self', '1', '2024-10-14 22:31:55', 'system:setting:list', NULL);
INSERT INTO `sys_menu` VALUES ('4ca4bfcc-5550-4cbe-9363-6888fae62373', '系统监控', 'ea018f53-0978-47f0-87c9-5d3f10152351', 'app', '/system/system-info', 'sever', 40, 'front', '_self', '1', '2024-10-22 16:16:22', '', NULL);
INSERT INTO `sys_menu` VALUES ('5003f3a7-e375-460a-ad53-0ba4ec6c5fe3', '消息通知', 'ea018f53-0978-47f0-87c9-5d3f10152351', 'app', '/system/notice-message', 'bell1', 25, 'front', '_self', '1', '2024-10-19 16:08:27', '', NULL);
INSERT INTO `sys_menu` VALUES ('5943b09b-640f-4997-afad-0565b3801d99', '配置管理-新增', '75f7c4c0-d645-4974-9d13-063c01fa3f5e', 'permission', '', NULL, 0, 'front', '_self', '1', '2024-10-14 22:30:57', 'system:setting:add', NULL);
INSERT INTO `sys_menu` VALUES ('5cc8ae96-79a4-49b4-81b1-629d72b1ca8d', '配置管理-删除', '75f7c4c0-d645-4974-9d13-063c01fa3f5e', 'permission', '', NULL, 1, 'front', '_self', '1', '2024-10-14 22:31:15', 'system:setting:remove', NULL);
INSERT INTO `sys_menu` VALUES ('5dc82ea6-99b7-4c94-bdc0-101204da191b', '机构管理-查询', '30d2fd74-2c48-4c9c-b3a1-177f2b656aee', 'permission', '', NULL, 3, 'front', '_self', '1', '2024-10-18 16:18:18', 'system:org:detail', NULL);
INSERT INTO `sys_menu` VALUES ('5e2c6680-89b1-4db2-a712-dcbde051e1aa', '首页', NULL, 'app', 'http://120.26.161.36:8080/', 'home1', 1, 'iframe', '_self', '1', '2024-04-18 15:15:08', '', NULL);
INSERT INTO `sys_menu` VALUES ('683408d4-39d0-4ef2-ba67-c73cb077de95', '消息通知-列表', '5003f3a7-e375-460a-ad53-0ba4ec6c5fe3', 'permission', '', NULL, 0, 'front', '_self', '1', '2024-10-19 20:27:43', 'private:notice:list', NULL);
INSERT INTO `sys_menu` VALUES ('6c248a22-42d1-49e6-9db0-8bcb66c23906', '机构管理-编辑', '30d2fd74-2c48-4c9c-b3a1-177f2b656aee', 'permission', '', NULL, 2, 'front', '_self', '1', '2024-10-18 16:18:25', 'system:org:update', NULL);
INSERT INTO `sys_menu` VALUES ('75f7c4c0-d645-4974-9d13-063c01fa3f5e', '配置管理', 'ea018f53-0978-47f0-87c9-5d3f10152351', 'app', '/system/setting', 'setting1', 20, 'front', '_self', '1', '2024-10-14 22:29:45', '', NULL);
INSERT INTO `sys_menu` VALUES ('77af7f7b-033f-41d5-8570-e91f39254a25', '操作日志-列表', 'b632cb5d-0a57-490c-beee-ed70f81c4b77', 'permission', '', NULL, 0, 'front', '_self', '1', '2024-10-25 20:19:30', 'system:operation:list', NULL);
INSERT INTO `sys_menu` VALUES ('819156dc-1e6f-4d8c-137e-b87d751c5d2a', '字典管理-详情', '210c010c-2b7c-4c8b-bab2-c049e9a32c5f', 'permission', '', NULL, 5, 'front', '_self', '1', '2024-10-13 12:27:58', 'system:dict:detail', NULL);
INSERT INTO `sys_menu` VALUES ('819156dc-1e6f-4d8c-837e-b87d751c5d1a', '菜单管理-详情', 'c6f2d8e8-d9d2-4de9-8378-5873f3032b96', 'permission', '', NULL, 5, 'front', '_self', '1', '2024-10-13 12:27:58', 'system:menu:detail', NULL);
INSERT INTO `sys_menu` VALUES ('819156dc-1e6f-4d8c-837e-b87d751c5d1b', '用户管理-详情', '088015e8-9a25-4202-a4f6-f05ebad41f1f', 'permission', '', NULL, 5, 'front', '_self', '1', '2024-10-13 12:27:58', 'system:user:detail', NULL);
INSERT INTO `sys_menu` VALUES ('819156dc-1e6f-4d8c-837e-b87d751c5d23', '角色管理-详情', '25545f61-a93a-4f42-9f80-743d0ceb2019', 'permission', '', NULL, 5, 'front', '_self', '1', '2024-10-13 12:27:58', 'system:role:detail', NULL);
INSERT INTO `sys_menu` VALUES ('827fcd7d-2e31-4a08-91d1-685dea716f88', '通知管理-删除', 'd526edad-b55a-48d5-83e0-ccd3903b7fdf', 'permission', '', NULL, 1, 'front', '_self', '1', '2024-10-19 20:26:31', 'system:notice:remove', NULL);
INSERT INTO `sys_menu` VALUES ('8ac55568-3a2d-422a-b47e-a25f4cc30275', '配置管理-编辑', '75f7c4c0-d645-4974-9d13-063c01fa3f5e', 'permission', '', NULL, 2, 'front', '_self', '1', '2024-10-14 22:31:35', 'system:setting:update', NULL);
INSERT INTO `sys_menu` VALUES ('8bd1ea0a-921d-4b50-1db4-446b0892b822', '字典管理-新增', '210c010c-2b7c-4c8b-bab2-c049e9a32c5f', 'permission', '', NULL, 1, 'front', '_self', '1', '2024-10-13 12:22:14', 'system:dict:add', NULL);
INSERT INTO `sys_menu` VALUES ('8bd1ea0a-921d-4b50-adb4-446b0892b811', '菜单管理-新增', 'c6f2d8e8-d9d2-4de9-8378-5873f3032b96', 'permission', '', NULL, 1, 'front', '_self', '1', '2024-10-13 12:22:14', 'system:menu:add', NULL);
INSERT INTO `sys_menu` VALUES ('8bd1ea0a-921d-4b50-adb4-446b0892b818', '用户管理-新增', '088015e8-9a25-4202-a4f6-f05ebad41f1f', 'permission', '', NULL, 1, 'front', '_self', '1', '2024-10-13 12:22:14', 'system:user:add', NULL);
INSERT INTO `sys_menu` VALUES ('8bd1ea0a-921d-4b50-adb4-446b0892b825', '角色管理-新增', '25545f61-a93a-4f42-9f80-743d0ceb2019', 'permission', '', NULL, 1, 'front', '_self', '1', '2024-10-13 12:22:14', 'system:role:add', NULL);
INSERT INTO `sys_menu` VALUES ('8eeb88af-2e07-4295-8632-3ee51fe26c4b', '机构管理-列表', '30d2fd74-2c48-4c9c-b3a1-177f2b656aee', 'permission', '', NULL, 4, 'front', '_self', '1', '2024-10-18 16:18:01', 'system:org:list', NULL);
INSERT INTO `sys_menu` VALUES ('ab5ebd33-ea6b-4307-85e8-7a5951b36358', '消息通知-提示', '5003f3a7-e375-460a-ad53-0ba4ec6c5fe3', 'permission', '', NULL, 1, 'front', '_self', '1', '2024-10-19 20:28:02', 'private:notice:limit', NULL);
INSERT INTO `sys_menu` VALUES ('b632cb5d-0a57-490c-beee-ed70f81c4b77', '操作日志', 'ea018f53-0978-47f0-87c9-5d3f10152351', 'app', '/system/opt-log', 'database', 35, 'front', '_self', '1', '2024-10-23 22:30:21', '', NULL);
INSERT INTO `sys_menu` VALUES ('b6385f1f-32bc-4b96-9c0e-0ad761d4843b', '登录日志', 'ea018f53-0978-47f0-87c9-5d3f10152351', 'app', '/system/login-log', 'login', 30, 'front', '_self', '1', '2024-10-18 20:13:34', '', NULL);
INSERT INTO `sys_menu` VALUES ('c6f2d8e8-d9d2-4de9-8378-5873f3032b96', '菜单管理', 'ea018f53-0978-47f0-87c9-5d3f10152351', 'app', '/system/menu', 'menu', 2, 'front', '_self', '1', '2024-04-15 09:52:11', '', NULL);
INSERT INTO `sys_menu` VALUES ('c75d19e6-e7ff-44ef-b9ed-cc759bcbfe00', '消息通知-详情', '5003f3a7-e375-460a-ad53-0ba4ec6c5fe3', 'permission', '', NULL, 2, 'front', '_self', '1', '2024-10-19 20:28:19', 'private:notice:detail', NULL);
INSERT INTO `sys_menu` VALUES ('cb52a5d2-e983-467d-1778-8812a4fa492c', '字典管理-查询', '210c010c-2b7c-4c8b-bab2-c049e9a32c5f', 'permission', '', NULL, 4, 'front', '_self', '1', '2024-10-13 12:21:39', 'system:dict:list', NULL);
INSERT INTO `sys_menu` VALUES ('cb52a5d2-e983-467d-8778-8812a4fa492c', '角色管理-查询', '25545f61-a93a-4f42-9f80-743d0ceb2019', 'permission', '', NULL, 4, 'front', '_self', '1', '2024-10-13 12:21:39', 'system:role:list', NULL);
INSERT INTO `sys_menu` VALUES ('cb52a5d2-e983-467d-8778-8812a4fa4989', '用户管理-查询', '088015e8-9a25-4202-a4f6-f05ebad41f1f', 'permission', '', NULL, 4, 'front', '_self', '1', '2024-10-13 12:21:39', 'system:user:list', NULL);
INSERT INTO `sys_menu` VALUES ('cb52a5d2-e983-467d-8778-8812a4fa498c', '菜单管理-查询', 'c6f2d8e8-d9d2-4de9-8378-5873f3032b96', 'permission', '', NULL, 4, 'front', '_self', '1', '2024-10-13 12:21:39', 'system:menu:list', NULL);
INSERT INTO `sys_menu` VALUES ('d526edad-b55a-48d5-83e0-ccd3903b7fdf', '通知管理', 'ea018f53-0978-47f0-87c9-5d3f10152351', 'app', '/system/notice', 'notification', 15, 'front', '_self', '1', '2024-10-19 15:23:01', '', NULL);
INSERT INTO `sys_menu` VALUES ('d8ccf895-3f96-4a19-83c5-a8f4ce22e408', '通知管理-列表', 'd526edad-b55a-48d5-83e0-ccd3903b7fdf', 'permission', '', NULL, 3, 'front', '_self', '1', '2024-10-19 20:27:17', 'system:notice:list', NULL);
INSERT INTO `sys_menu` VALUES ('ea018f53-0978-47f0-87c9-5d3f10152351', '系统管理', NULL, 'directory', NULL, 'appstore', 20, 'front', '_self', '1', '2024-04-15 09:51:55', '', NULL);
INSERT INTO `sys_menu` VALUES ('f089bfbb-4262-4c68-bff6-d0f4421f0681', '机构管理-删除', '30d2fd74-2c48-4c9c-b3a1-177f2b656aee', 'permission', '', NULL, 1, 'front', '_self', '1', '2024-10-18 16:18:34', 'system:org:remove', NULL);
INSERT INTO `sys_menu` VALUES ('f17472e9-c11d-4a83-8f5f-4b7e4f4fd87a', '资源管理-上传', '1ceb1725-29dd-486b-95e5-d4d158e2eaa7', 'permission', '', NULL, 1, 'front', '_self', '1', '2024-10-25 20:22:52', 'system:resource:upload', NULL);
INSERT INTO `sys_menu` VALUES ('f6b292d5-016a-462d-8eeb-d746e03e2295', '登录日志-列表', 'b6385f1f-32bc-4b96-9c0e-0ad761d4843b', 'permission', '', NULL, 0, 'front', '_self', '1', '2024-10-25 20:20:46', 'system:loginlog:list', NULL);

-- ----------------------------
-- Table structure for sys_notice
-- ----------------------------
DROP TABLE IF EXISTS `sys_notice`;
CREATE TABLE `sys_notice`  (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '通知id',
  `title` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '通知标题',
  `content` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '通知内容',
  `create_time` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `create_by` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '创建人',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 12 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of sys_notice
-- ----------------------------
INSERT INTO `sys_notice` VALUES (11, 'gaius-admin(v1.0)', 'gaius-admin后台管理系统正式发布了', '2024-10-25 20:34:26', 'b897cd3d-e63f-4132-ac1e-9b6bd7b1ceba');

-- ----------------------------
-- Table structure for sys_notice_user
-- ----------------------------
DROP TABLE IF EXISTS `sys_notice_user`;
CREATE TABLE `sys_notice_user`  (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '根据通知和用户生成的id',
  `notice_id` int(11) NOT NULL COMMENT '通知id',
  `receive_id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '接收通知的用户id',
  `status` char(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '0' COMMENT '通知状态：0-未读，1-已读',
  `create_time` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `read_time` timestamp(0) NULL DEFAULT NULL COMMENT '通知阅读时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 58 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of sys_notice_user
-- ----------------------------
INSERT INTO `sys_notice_user` VALUES (57, 11, 'aeba760f-0bb2-4b7e-adf7-a6136b85f9c2', '0', '2024-10-25 20:34:26', NULL);

-- ----------------------------
-- Table structure for sys_opt_log
-- ----------------------------
DROP TABLE IF EXISTS `sys_opt_log`;
CREATE TABLE `sys_opt_log`  (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '日志唯一标识',
  `username` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '操作用户名',
  `ip` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '操作客户端ip',
  `location` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '操作地址',
  `request_type` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '请求类型:GET,POST',
  `request_url` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '请求地址',
  `request_param` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '请求参数',
  `module_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '模块名称',
  `func_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '方法名称',
  `opt_module` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '操作模块',
  `opt_type` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '操作类型',
  `response_status` char(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '操作状态:1-成功，0-失败',
  `response_time` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '响应时间',
  `response_result` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL COMMENT '请求结果',
  `err_msg` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL COMMENT '错误的异常信息',
  `create_time` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 73 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for sys_org
-- ----------------------------
DROP TABLE IF EXISTS `sys_org`;
CREATE TABLE `sys_org`  (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '机构id',
  `org_name` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '机构名称',
  `parent_id` int(11) NULL DEFAULT NULL COMMENT '父级机构id',
  `ancestors` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '祖级列表',
  `status` char(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '1' COMMENT '状态',
  `remark` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '备注',
  `sort_num` int(11) NOT NULL COMMENT '排序',
  `create_time` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 10 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of sys_org
-- ----------------------------
INSERT INTO `sys_org` VALUES (1, '机构1', NULL, '', '1', '', 0, '2024-10-18 17:54:58');
INSERT INTO `sys_org` VALUES (2, '机构2', NULL, '', '1', '测试数据，随时可以删除。', 1, '2024-10-18 17:55:06');
INSERT INTO `sys_org` VALUES (3, '机构1-1', 1, '1', '1', '', 1, '2024-10-18 17:55:15');
INSERT INTO `sys_org` VALUES (7, '机构2-1', 2, '2', '1', '', 1, '2024-10-24 11:26:48');
INSERT INTO `sys_org` VALUES (9, 'test', 3, '1,3', '1', '', 0, '2024-10-24 20:20:55');

-- ----------------------------
-- Table structure for sys_role
-- ----------------------------
DROP TABLE IF EXISTS `sys_role`;
CREATE TABLE `sys_role`  (
  `role_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '权限名称',
  `status` char(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '1' COMMENT '状态：0-停用，1-启用',
  `is_super` int(11) NOT NULL DEFAULT 0 COMMENT '是否超级管理员',
  `create_time` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `remark` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '备注',
  `role_id` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '权限id',
  `role_key` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '权限标识',
  `data_perm` char(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT '4' COMMENT '数据权限:  1-所有机构数据权限,2-本机构及下属机构数据权限,3-仅限本机构数据权限,4-仅限本人权限',
  PRIMARY KEY (`role_id`) USING BTREE,
  UNIQUE INDEX `IDX_2320bd906a4f61ac7ddcb645cd`(`role_key`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of sys_role
-- ----------------------------
INSERT INTO `sys_role` VALUES ('测试角色', '1', 0, '2024-10-13 14:06:03', '无删除权限', '5d35fb6a-8b73-4533-8217-6c35de9032cb', 'testrole', '2');
INSERT INTO `sys_role` VALUES ('超级管理员', '1', 1, '2024-10-12 21:45:15', NULL, 'ad', 'admin', '1');

-- ----------------------------
-- Table structure for sys_role_menu
-- ----------------------------
DROP TABLE IF EXISTS `sys_role_menu`;
CREATE TABLE `sys_role_menu`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `role_id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `menu_id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 514 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of sys_role_menu
-- ----------------------------
INSERT INTO `sys_role_menu` VALUES (472, '5d35fb6a-8b73-4533-8217-6c35de9032cb', '5e2c6680-89b1-4db2-a712-dcbde051e1aa');
INSERT INTO `sys_role_menu` VALUES (473, '5d35fb6a-8b73-4533-8217-6c35de9032cb', 'ea018f53-0978-47f0-87c9-5d3f10152351');
INSERT INTO `sys_role_menu` VALUES (474, '5d35fb6a-8b73-4533-8217-6c35de9032cb', '088015e8-9a25-4202-a4f6-f05ebad41f1f');
INSERT INTO `sys_role_menu` VALUES (475, '5d35fb6a-8b73-4533-8217-6c35de9032cb', 'c6f2d8e8-d9d2-4de9-8378-5873f3032b96');
INSERT INTO `sys_role_menu` VALUES (476, '5d35fb6a-8b73-4533-8217-6c35de9032cb', '210c010c-2b7c-4c8b-bab2-c049e9a32c5f');
INSERT INTO `sys_role_menu` VALUES (477, '5d35fb6a-8b73-4533-8217-6c35de9032cb', '25545f61-a93a-4f42-9f80-743d0ceb2019');
INSERT INTO `sys_role_menu` VALUES (478, '5d35fb6a-8b73-4533-8217-6c35de9032cb', 'a1ae5056-ef93-4752-89f6-e1eeb75b53a5');
INSERT INTO `sys_role_menu` VALUES (479, '5d35fb6a-8b73-4533-8217-6c35de9032cb', 'cb52a5d2-e983-467d-8778-8812a4fa492c');
INSERT INTO `sys_role_menu` VALUES (480, '5d35fb6a-8b73-4533-8217-6c35de9032cb', '819156dc-1e6f-4d8c-837e-b87d751c5d23');
INSERT INTO `sys_role_menu` VALUES (481, '5d35fb6a-8b73-4533-8217-6c35de9032cb', '8bd1ea0a-921d-4b50-1db4-446b0892b822');
INSERT INTO `sys_role_menu` VALUES (482, '5d35fb6a-8b73-4533-8217-6c35de9032cb', 'cb52a5d2-e983-467d-1778-8812a4fa492c');
INSERT INTO `sys_role_menu` VALUES (483, '5d35fb6a-8b73-4533-8217-6c35de9032cb', '819156dc-1e6f-4d8c-137e-b87d751c5d2a');
INSERT INTO `sys_role_menu` VALUES (484, '5d35fb6a-8b73-4533-8217-6c35de9032cb', '8bd1ea0a-921d-4b50-adb4-446b0892b811');
INSERT INTO `sys_role_menu` VALUES (485, '5d35fb6a-8b73-4533-8217-6c35de9032cb', 'cb52a5d2-e983-467d-8778-8812a4fa498c');
INSERT INTO `sys_role_menu` VALUES (486, '5d35fb6a-8b73-4533-8217-6c35de9032cb', '819156dc-1e6f-4d8c-837e-b87d751c5d1a');
INSERT INTO `sys_role_menu` VALUES (487, '5d35fb6a-8b73-4533-8217-6c35de9032cb', 'cb52a5d2-e983-467d-8778-8812a4fa4989');
INSERT INTO `sys_role_menu` VALUES (488, '5d35fb6a-8b73-4533-8217-6c35de9032cb', 'd0e1d07c-07cb-4ef7-bb5f-72467187f62c');
INSERT INTO `sys_role_menu` VALUES (489, '5d35fb6a-8b73-4533-8217-6c35de9032cb', '896a2a30-7fba-41a0-8826-b95057547291');
INSERT INTO `sys_role_menu` VALUES (490, '5d35fb6a-8b73-4533-8217-6c35de9032cb', '819156dc-1e6f-4d8c-837e-b87d751c5d1b');
INSERT INTO `sys_role_menu` VALUES (491, '5d35fb6a-8b73-4533-8217-6c35de9032cb', '0e6bb625-fc3a-48ba-b4a4-5d9617c11274');
INSERT INTO `sys_role_menu` VALUES (492, '5d35fb6a-8b73-4533-8217-6c35de9032cb', 'b6385f1f-32bc-4b96-9c0e-0ad761d4843b');
INSERT INTO `sys_role_menu` VALUES (493, '5d35fb6a-8b73-4533-8217-6c35de9032cb', '30d2fd74-2c48-4c9c-b3a1-177f2b656aee');
INSERT INTO `sys_role_menu` VALUES (494, '5d35fb6a-8b73-4533-8217-6c35de9032cb', '8eeb88af-2e07-4295-8632-3ee51fe26c4b');
INSERT INTO `sys_role_menu` VALUES (495, '5d35fb6a-8b73-4533-8217-6c35de9032cb', '5dc82ea6-99b7-4c94-bdc0-101204da191b');
INSERT INTO `sys_role_menu` VALUES (496, '5d35fb6a-8b73-4533-8217-6c35de9032cb', '5003f3a7-e375-460a-ad53-0ba4ec6c5fe3');
INSERT INTO `sys_role_menu` VALUES (497, '5d35fb6a-8b73-4533-8217-6c35de9032cb', '683408d4-39d0-4ef2-ba67-c73cb077de95');
INSERT INTO `sys_role_menu` VALUES (498, '5d35fb6a-8b73-4533-8217-6c35de9032cb', 'ab5ebd33-ea6b-4307-85e8-7a5951b36358');
INSERT INTO `sys_role_menu` VALUES (499, '5d35fb6a-8b73-4533-8217-6c35de9032cb', 'c75d19e6-e7ff-44ef-b9ed-cc759bcbfe00');
INSERT INTO `sys_role_menu` VALUES (500, '5d35fb6a-8b73-4533-8217-6c35de9032cb', '36d85817-3709-41c6-8ac7-7a1a3924c883');
INSERT INTO `sys_role_menu` VALUES (501, '5d35fb6a-8b73-4533-8217-6c35de9032cb', 'd526edad-b55a-48d5-83e0-ccd3903b7fdf');
INSERT INTO `sys_role_menu` VALUES (502, '5d35fb6a-8b73-4533-8217-6c35de9032cb', 'd8ccf895-3f96-4a19-83c5-a8f4ce22e408');
INSERT INTO `sys_role_menu` VALUES (503, '5d35fb6a-8b73-4533-8217-6c35de9032cb', '75f7c4c0-d645-4974-9d13-063c01fa3f5e');
INSERT INTO `sys_role_menu` VALUES (504, '5d35fb6a-8b73-4533-8217-6c35de9032cb', '5943b09b-640f-4997-afad-0565b3801d99');
INSERT INTO `sys_role_menu` VALUES (505, '5d35fb6a-8b73-4533-8217-6c35de9032cb', '0b269829-8045-4e8a-8b3a-da12d86f2483');
INSERT INTO `sys_role_menu` VALUES (506, '5d35fb6a-8b73-4533-8217-6c35de9032cb', '49b3217b-c5d4-4acf-be3c-8ca7add2a368');
INSERT INTO `sys_role_menu` VALUES (507, '5d35fb6a-8b73-4533-8217-6c35de9032cb', 'b632cb5d-0a57-490c-beee-ed70f81c4b77');
INSERT INTO `sys_role_menu` VALUES (508, '5d35fb6a-8b73-4533-8217-6c35de9032cb', '4ca4bfcc-5550-4cbe-9363-6888fae62373');
INSERT INTO `sys_role_menu` VALUES (509, '5d35fb6a-8b73-4533-8217-6c35de9032cb', '8bd1ea0a-921d-4b50-adb4-446b0892b818');
INSERT INTO `sys_role_menu` VALUES (510, '5d35fb6a-8b73-4533-8217-6c35de9032cb', '1ccff2ba-ed02-40df-bf0d-d2251d07b1f8');
INSERT INTO `sys_role_menu` VALUES (511, '5d35fb6a-8b73-4533-8217-6c35de9032cb', '6c248a22-42d1-49e6-9db0-8bcb66c23906');
INSERT INTO `sys_role_menu` VALUES (512, '5d35fb6a-8b73-4533-8217-6c35de9032cb', 'f6b292d5-016a-462d-8eeb-d746e03e2295');
INSERT INTO `sys_role_menu` VALUES (513, '5d35fb6a-8b73-4533-8217-6c35de9032cb', '77af7f7b-033f-41d5-8570-e91f39254a25');

-- ----------------------------
-- Table structure for sys_setting
-- ----------------------------
DROP TABLE IF EXISTS `sys_setting`;
CREATE TABLE `sys_setting`  (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '标识',
  `setting_key` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '设置项键名',
  `setting_value` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '设置项值',
  `setting_type` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '设置项所属类型,如:system-系统配置',
  `remark` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL COMMENT '备注',
  `status` char(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '1' COMMENT '状态',
  `create_time` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `IDX_8159e6391940716e880ec2b668`(`setting_key`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 6 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of sys_setting
-- ----------------------------
INSERT INTO `sys_setting` VALUES (1, 'projectName', '后台管理系统', 'system', '系统名称', '1', '2024-10-14 22:40:20');
INSERT INTO `sys_setting` VALUES (2, 'projectVersion', 'v1.0', 'system', '系统版本', '1', '2024-10-15 16:21:56');
INSERT INTO `sys_setting` VALUES (3, 'projectLogo', '/prod/static/uploads/1728983154955.png', 'system', '系统logo', '1', '2024-10-15 16:22:36');
INSERT INTO `sys_setting` VALUES (4, 'projectBgUrl', '/prod/static/uploads/1728983093449.webp', 'system', '系统登录页背景图', '1', '2024-10-15 16:22:49');
INSERT INTO `sys_setting` VALUES (5, 'projectWatermark', '1', 'system', '是否显示水印，0-不显示、1-显示', '1', '2024-10-15 16:24:46');

-- ----------------------------
-- Table structure for sys_upload
-- ----------------------------
DROP TABLE IF EXISTS `sys_upload`;
CREATE TABLE `sys_upload`  (
  `id` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `file_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '文件名',
  `original_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '文件原始名称',
  `path` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '上传文件地址',
  `size` int(11) NOT NULL COMMENT '文件大小',
  `create_time` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of sys_upload
-- ----------------------------
INSERT INTO `sys_upload` VALUES ('57f4c256-c8f3-4549-9f31-397d18ffb87f', '1728983089261.jpg', '井盖.jpg', '/static/uploads/1728983089261.jpg', 19741, '2024-10-15 17:04:49');
INSERT INTO `sys_upload` VALUES ('61ed8d80-f0ec-467f-bf35-1a7eeb57c20f', '1728983154955.png', 'icon.png', '/static/uploads/1728983154955.png', 11280, '2024-10-15 17:05:54');
INSERT INTO `sys_upload` VALUES ('7e733c1a-04c1-4d9e-b028-874e3e7addf8', '1728899795660.png', 'svg.png', '/static/uploads/1728899795660.png', 28627, '2024-10-14 17:56:35');
INSERT INTO `sys_upload` VALUES ('81ffccc0-4a88-4a1e-8305-197051c374ee', '1728983077289.jpg', '肥鯮.jpg', '/static/uploads/1728983077289.jpg', 29282, '2024-10-15 17:04:37');
INSERT INTO `sys_upload` VALUES ('aae67664-dd41-4a31-a56c-94f3b95bcd9e', '1728983083239.png', '花花.png', '/static/uploads/1728983083239.png', 49670, '2024-10-15 17:04:43');
INSERT INTO `sys_upload` VALUES ('ad86a700-3ecb-408a-b971-e1890e9d2aa8', '1728983093449.webp', 'bef69558f77f710e05a25f66ad1076bed7.webp', '/static/uploads/1728983093449.webp', 217666, '2024-10-15 17:04:53');

-- ----------------------------
-- Table structure for sys_user
-- ----------------------------
DROP TABLE IF EXISTS `sys_user`;
CREATE TABLE `sys_user`  (
  `user_id` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '用户Id',
  `username` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '用户名',
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '密码',
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '联系邮箱',
  `create_time` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '昵称',
  `avatar` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '头像',
  `salt` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '盐',
  `phone` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '联系电话',
  `status` char(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT '1',
  `org_id` int(11) NULL DEFAULT NULL COMMENT '所属机构id',
  PRIMARY KEY (`user_id`) USING BTREE,
  UNIQUE INDEX `IDX_9e7164b2f1ea1348bc0eb0a7da`(`username`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of sys_user
-- ----------------------------
INSERT INTO `sys_user` VALUES ('186c0250-1049-48e3-a354-b14cad246fd1', 'test1', 'ce9b379b837373e0f603e3433a15cb74e35af4b14c6ce45959c5b094205ca93d8b5ea422a5e12249915bb2f73d1077053924cf4f7b90131fbaafcaa8711e34c2', '2388838628@qq.com', '2024-10-19 21:02:41', '测试账户1', 'http://120.26.161.36:8899/static/uploads/1728983083239.png', '8047', '', '1', 5);
INSERT INTO `sys_user` VALUES ('aeba760f-0bb2-4b7e-adf7-a6136b85f9c2', 'test', '2817aaf0c5e0f5ad90473820f71a3929c9d957b912fefaa002595dd4e6e500a7fee3123c81443dde1a1fc5c962a34a434b11dbd42a6acc271da79593af021ebd', '', '2024-10-15 21:44:42', '测试用户', '/prod//static/uploads/1728983077289.jpg', '8978', '', '1', 3);
INSERT INTO `sys_user` VALUES ('b897cd3d-e63f-4132-ac1e-9b6bd7b1ceba', 'gaius', 'b94d107e4656cc7bfc66be0bbdaade4607710d33eccc5c4e7e04268fa48b74727da2067da9226a8a6c2f33820460f2e57970a6274227d913c8346b535ba2fd08', 'gaius-admin@qq.com', '2024-10-25 16:45:39', 'gaius-admin', 'http://120.26.161.36:8899/static/uploads/1728983154955.png', '5722', '', '1', 1);

-- ----------------------------
-- Table structure for sys_user_role
-- ----------------------------
DROP TABLE IF EXISTS `sys_user_role`;
CREATE TABLE `sys_user_role`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `role_id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 33 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of sys_user_role
-- ----------------------------
INSERT INTO `sys_user_role` VALUES (22, 'aeba760f-0bb2-4b7e-adf7-a6136b85f9c2', '5d35fb6a-8b73-4533-8217-6c35de9032cb');
INSERT INTO `sys_user_role` VALUES (29, '186c0250-1049-48e3-a354-b14cad246fd1', '5d35fb6a-8b73-4533-8217-6c35de9032cb');
INSERT INTO `sys_user_role` VALUES (32, 'b897cd3d-e63f-4132-ac1e-9b6bd7b1ceba', 'ad');

SET FOREIGN_KEY_CHECKS = 1;
