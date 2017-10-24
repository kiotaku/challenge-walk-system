class CheckPoint < ApplicationRecord
  belongs_to :previous_check_point, class_name: 'CheckPoint'
  has_one :next_check_point, class_name: 'CheckPoint', foreign_key: 'previous_check_point_id'
  has_many :check_point_statuses
end
