class User < ApplicationRecord
  has_many :check_point_statuses, dependent: :destroy

  STATE = [
    'joining',
    'retire',
    'finished'
  ]

  def pass_check_point(name)
    check_point_status = check_point_statuses.search_with_name name
    check_point_status.pass
    if check_point_statuses.not_pass.blank?
      update state: 'finished'
    end
  end

  def retire
    if state == 'finished'
      raise UserAlreadyFinishedError
    end
    update state: 'retire'
    check_point_statuses.not_pass.map(&:retire)
  end
end
